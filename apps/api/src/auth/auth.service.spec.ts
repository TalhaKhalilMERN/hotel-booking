import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as argon2 from 'argon2';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: Partial<Record<keyof PrismaService, any>>;
  let jwtService: Partial<Record<keyof JwtService, any>>;
  let configService: Partial<Record<keyof ConfigService, any>>;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
      },
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('signed-jwt-token'),
    };

    configService = {
      get: jest.fn((key: string, defaultVal?: any) => {
        if (key === 'INITIAL_ADMIN_EMAIL') return 'admin@hamiltonhotel.pk';
        if (key === 'INITIAL_ADMIN_PASSWORD') return 'SecureAdminPass123!';
        if (key === 'INITIAL_ADMIN_NAME') return 'Hamilton Admin';
        if (key === 'JWT_SECRET') return 'test-secret';
        return defaultVal;
      }),
    };

    authService = new AuthService(
      prisma as unknown as PrismaService,
      jwtService as unknown as JwtService,
      configService as unknown as ConfigService,
    );
  });

  describe('validateUser', () => {
    it('successfully validates user with correct email and Argon2id password', async () => {
      const password = 'CorrectPassword123!';
      const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        passwordHash,
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      });

      const user = await authService.validateUser(
        'admin@hamiltonhotel.pk',
        password,
      );

      expect(user).toEqual({
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      });
      // Ensure passwordHash is never returned
      expect((user as any).passwordHash).toBeUndefined();
    });

    it('rejects with generic 401 when email is not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.validateUser('unknown@example.com', 'AnyPassword123!'),
      ).rejects.toThrow(UnauthorizedException);

      await expect(
        authService.validateUser('unknown@example.com', 'AnyPassword123!'),
      ).rejects.toThrow('Invalid credentials');
    });

    it('rejects with generic 401 when password does not match hash', async () => {
      const passwordHash = await argon2.hash('RealPassword123!', {
        type: argon2.argon2id,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        passwordHash,
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      });

      await expect(
        authService.validateUser('admin@hamiltonhotel.pk', 'WrongPassword123!'),
      ).rejects.toThrow(UnauthorizedException);

      await expect(
        authService.validateUser('admin@hamiltonhotel.pk', 'WrongPassword123!'),
      ).rejects.toThrow('Invalid credentials');
    });

    it('rejects with generic 401 when email or password is empty', async () => {
      await expect(
        authService.validateUser('', 'Password123!'),
      ).rejects.toThrow(UnauthorizedException);

      await expect(
        authService.validateUser('admin@hamiltonhotel.pk', ''),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('handles legacy or malformed hash without crashing and returns generic 401', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        passwordHash: 'not-an-argon2-hash-string',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      });

      await expect(
        authService.validateUser('admin@hamiltonhotel.pk', 'Password123!'),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('generateToken', () => {
    it('generates a JWT containing the user identity and role', async () => {
      const user = {
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      };

      const token = await authService.generateToken(user);

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        role: UserRole.ADMIN,
        name: 'Hamilton Admin',
      });
      expect(token).toBe('signed-jwt-token');
    });
  });

  describe('bootstrapAdmin safety controls', () => {
    it('creates initial admin when no admin exists and email is not registered', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.count as jest.Mock).mockResolvedValue(0);

      await authService.bootstrapAdmin();

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'admin@hamiltonhotel.pk',
            role: UserRole.ADMIN,
            name: 'Hamilton Admin',
          }),
        }),
      );

      // Verify that created password is an Argon2id hash
      const createCall = (prisma.user.create as jest.Mock).mock.calls[0][0];
      const createdHash = createCall.data.passwordHash;
      expect(createdHash).toMatch(/^\$argon2id\$/);
      const isVerified = await argon2.verify(createdHash, 'SecureAdminPass123!');
      expect(isVerified).toBe(true);
    });

    it('never overwrites existing admin password', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'existing-admin-id',
        email: 'admin@hamiltonhotel.pk',
        passwordHash: 'original-existing-hash',
        role: UserRole.ADMIN,
      });

      await authService.bootstrapAdmin();

      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('refuses to promote or overwrite existing non-admin user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'customer-user-id',
        email: 'admin@hamiltonhotel.pk',
        passwordHash: 'customer-existing-hash',
        role: UserRole.CUSTOMER,
      });

      await authService.bootstrapAdmin();

      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('does not create multiple admin accounts if an admin already exists', async () => {
      (configService.get as jest.Mock).mockImplementation((key: string) => {
        if (key === 'INITIAL_ADMIN_EMAIL') return 'new-admin@hamiltonhotel.pk';
        if (key === 'INITIAL_ADMIN_PASSWORD') return 'Pass123!';
        return null;
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.count as jest.Mock).mockResolvedValue(1); // Already 1 admin exists

      await authService.bootstrapAdmin();

      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('skips bootstrap gracefully when environment variables are missing', async () => {
      (configService.get as jest.Mock).mockReturnValue(undefined);

      await authService.bootstrapAdmin();

      expect(prisma.user.findUnique).not.toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });
});
