import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { RolesGuard } from './guards/roles.guard';
import { PrismaService } from '../prisma/prisma.service';

describe('Auth Guards', () => {
  describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let jwtService: Partial<Record<keyof JwtService, any>>;
    let configService: Partial<Record<keyof ConfigService, any>>;
    let prisma: Partial<Record<keyof PrismaService, any>>;

    beforeEach(() => {
      jwtService = {
        verifyAsync: jest.fn(),
      };
      configService = {
        get: jest.fn().mockReturnValue('test-secret'),
      };
      prisma = {
        user: {
          findUnique: jest.fn(),
        },
      };

      authGuard = new AuthGuard(
        jwtService as unknown as JwtService,
        configService as unknown as ConfigService,
        prisma as unknown as PrismaService,
      );
    });

    function createMockContext(request: any): ExecutionContext {
      return {
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      } as unknown as ExecutionContext;
    }

    it('rejects unauthenticated request with no cookie or header with 401', async () => {
      const context = createMockContext({
        cookies: {},
        headers: {},
      });

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(authGuard.canActivate(context)).rejects.toThrow(
        'Authentication required',
      );
    });

    it('authenticates successfully from HttpOnly cookie', async () => {
      const mockUser = {
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      };

      (jwtService.verifyAsync as jest.Mock).mockResolvedValue({
        sub: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        role: UserRole.ADMIN,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const request: any = {
        cookies: { admin_token: 'valid-cookie-token' },
        headers: {},
      };
      const context = createMockContext(request);

      const canActivate = await authGuard.canActivate(context);

      expect(canActivate).toBe(true);
      expect(request.user).toEqual(mockUser);
    });

    it('authenticates successfully from Authorization Bearer header', async () => {
      const mockUser = {
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      };

      (jwtService.verifyAsync as jest.Mock).mockResolvedValue({
        sub: 'user-uuid-1',
      });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const request: any = {
        cookies: {},
        headers: { authorization: 'Bearer valid-header-token' },
      };
      const context = createMockContext(request);

      const canActivate = await authGuard.canActivate(context);

      expect(canActivate).toBe(true);
      expect(request.user).toEqual(mockUser);
    });

    it('rejects invalid or expired token with 401', async () => {
      (jwtService.verifyAsync as jest.Mock).mockRejectedValue(
        new Error('jwt expired'),
      );

      const request: any = {
        cookies: { admin_token: 'expired-token' },
        headers: {},
      };
      const context = createMockContext(request);

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(authGuard.canActivate(context)).rejects.toThrow(
        'Invalid or expired authentication token',
      );
    });

    it('rejects if user no longer exists in database', async () => {
      (jwtService.verifyAsync as jest.Mock).mockResolvedValue({
        sub: 'deleted-user-uuid',
      });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const request: any = {
        cookies: { admin_token: 'token-for-deleted-user' },
        headers: {},
      };
      const context = createMockContext(request);

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        'User account no longer exists',
      );
    });
  });

  describe('AdminGuard', () => {
    let adminGuard: AdminGuard;

    beforeEach(() => {
      adminGuard = new AdminGuard();
    });

    function createMockContext(user: any): ExecutionContext {
      return {
        switchToHttp: () => ({
          getRequest: () => ({ user }),
        }),
      } as unknown as ExecutionContext;
    }

    it('allows access when user has ADMIN role', () => {
      const context = createMockContext({
        id: 'admin-id',
        role: UserRole.ADMIN,
      });

      expect(adminGuard.canActivate(context)).toBe(true);
    });

    it('rejects non-admin (CUSTOMER) with 403 Forbidden', () => {
      const context = createMockContext({
        id: 'customer-id',
        role: UserRole.CUSTOMER,
      });

      expect(() => adminGuard.canActivate(context)).toThrow(ForbiddenException);
      expect(() => adminGuard.canActivate(context)).toThrow(
        'Access denied: Administrator privileges required',
      );
    });

    it('rejects non-admin (STAFF) with 403 Forbidden', () => {
      const context = createMockContext({
        id: 'staff-id',
        role: UserRole.STAFF,
      });

      expect(() => adminGuard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('rejects when no user is present on request with 403 Forbidden', () => {
      const context = createMockContext(undefined);

      expect(() => adminGuard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  describe('RolesGuard', () => {
    let rolesGuard: RolesGuard;
    let reflector: Partial<Record<keyof Reflector, any>>;

    beforeEach(() => {
      reflector = {
        getAllAndOverride: jest.fn(),
      };
      rolesGuard = new RolesGuard(reflector as unknown as Reflector);
    });

    function createMockContext(user: any): ExecutionContext {
      return {
        getHandler: () => {},
        getClass: () => {},
        switchToHttp: () => ({
          getRequest: () => ({ user }),
        }),
      } as unknown as ExecutionContext;
    }

    it('allows access if no specific roles are required', () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(undefined);
      const context = createMockContext({ role: UserRole.CUSTOMER });

      expect(rolesGuard.canActivate(context)).toBe(true);
    });

    it('allows access if user has one of the required roles', () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue([
        UserRole.ADMIN,
        UserRole.STAFF,
      ]);
      const context = createMockContext({ role: UserRole.ADMIN });

      expect(rolesGuard.canActivate(context)).toBe(true);
    });

    it('rejects user with 403 when role does not match required roles', () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue([
        UserRole.ADMIN,
      ]);
      const context = createMockContext({ role: UserRole.CUSTOMER });

      expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
    });
  });
});
