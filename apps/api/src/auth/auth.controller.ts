import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthenticatedUser } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Secure login endpoint.
   * Sets an HttpOnly cookie and also returns the user profile & token.
   * Generic 401 on any credential failure.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const token = await this.authService.generateToken(user);

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    // Set secure HttpOnly cookie for web/admin frontends
    response.cookie('admin_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return {
      user,
      token,
    };
  }

  /**
   * Logout endpoint.
   * Clears the HttpOnly authentication cookie.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    response.clearCookie('admin_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      path: '/',
    });

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  /**
   * Returns authenticated user profile for the current session.
   * Allows frontend to determine authentication status and user details.
   */
  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() request: Request & { user: AuthenticatedUser }) {
    return {
      user: request.user,
    };
  }

  /**
   * Verification endpoint requiring both valid authentication AND the ADMIN role.
   */
  @Get('admin-check')
  @UseGuards(AuthGuard, AdminGuard)
  verifyAdminAccess(@Req() request: Request & { user: AuthenticatedUser }) {
    return {
      success: true,
      message: 'Admin access verified',
      user: request.user,
    };
  }
}
