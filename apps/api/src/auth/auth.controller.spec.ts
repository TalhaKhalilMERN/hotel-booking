import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: Partial<Record<keyof AuthService, any>>;
  let configService: Partial<Record<keyof ConfigService, any>>;

  beforeEach(() => {
    authService = {
      validateUser: jest.fn(),
      generateToken: jest.fn(),
    };

    configService = {
      get: jest.fn((key: string, defaultVal?: any) => {
        if (key === 'NODE_ENV') return 'development';
        return defaultVal;
      }),
    };

    authController = new AuthController(
      authService as unknown as AuthService,
      configService as unknown as ConfigService,
    );
  });

  describe('POST /auth/login', () => {
    it('authenticates user, returns user and token, and sets HttpOnly cookie', async () => {
      const mockUser = {
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      };

      (authService.validateUser as jest.Mock).mockResolvedValue(mockUser);
      (authService.generateToken as jest.Mock).mockResolvedValue('jwt-token-xyz');

      const mockResponse: any = {
        cookie: jest.fn(),
      };

      const result = await authController.login(
        { email: 'admin@hamiltonhotel.pk', password: 'ValidPass123!' },
        mockResponse,
      );

      expect(authService.validateUser).toHaveBeenCalledWith(
        'admin@hamiltonhotel.pk',
        'ValidPass123!',
      );
      expect(authService.generateToken).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        user: mockUser,
        token: 'jwt-token-xyz',
      });

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'admin_token',
        'jwt-token-xyz',
        expect.objectContaining({
          httpOnly: true,
          path: '/',
          maxAge: 24 * 60 * 60 * 1000,
        }),
      );
    });
  });

  describe('POST /auth/logout', () => {
    it('clears admin_token cookie and returns success message', () => {
      const mockResponse: any = {
        clearCookie: jest.fn(),
      };

      const result = authController.logout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(
        'admin_token',
        expect.objectContaining({
          httpOnly: true,
          path: '/',
        }),
      );
      expect(result).toEqual({
        success: true,
        message: 'Logged out successfully',
      });
    });
  });

  describe('GET /auth/me', () => {
    it('returns the current authenticated user from request', () => {
      const mockUser = {
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      };

      const mockRequest: any = { user: mockUser };
      const result = authController.getCurrentUser(mockRequest);

      expect(result).toEqual({ user: mockUser });
    });
  });

  describe('GET /auth/admin-check', () => {
    it('returns success and user profile when admin access is verified', () => {
      const mockUser = {
        id: 'user-uuid-1',
        email: 'admin@hamiltonhotel.pk',
        name: 'Hamilton Admin',
        role: UserRole.ADMIN,
      };

      const mockRequest: any = { user: mockUser };
      const result = authController.verifyAdminAccess(mockRequest);

      expect(result).toEqual({
        success: true,
        message: 'Admin access verified',
        user: mockUser,
      });
    });
  });
});
