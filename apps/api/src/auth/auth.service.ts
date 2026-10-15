import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthenticatedUser,
  JwtPayload,
} from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.bootstrapAdmin();
  }

  /**
   * Controlled server-side bootstrap to provision the initial administrator.
   *
   * Safety guarantees:
   * 1. Uses Argon2id password hashing.
   * 2. Never hardcodes credentials or commits secrets.
   * 3. Cannot silently overwrite an existing account's password.
   * 4. Cannot promote an existing non-admin user to admin.
   * 5. Ensures exactly one initially provisioned administrator exists.
   */
  async bootstrapAdmin(): Promise<void> {
    const adminEmail = this.configService.get<string>('INITIAL_ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('INITIAL_ADMIN_PASSWORD');
    const adminName = this.configService.get<string>(
      'INITIAL_ADMIN_NAME',
      'Hamilton Administrator',
    );

    if (!adminEmail || !adminPassword) {
      this.logger.log(
        'Initial admin bootstrap credentials not set in environment (INITIAL_ADMIN_EMAIL / INITIAL_ADMIN_PASSWORD). Skipping initial admin bootstrap.',
      );
      return;
    }

    const normalizedEmail = adminEmail.toLowerCase().trim();

    // Check if an account already exists with this email
    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      if (existingUser.role === UserRole.ADMIN) {
        this.logger.log(
          `Initial administrator account "${normalizedEmail}" already exists. Preserving existing account and credentials.`,
        );
      } else {
        this.logger.warn(
          `Account "${normalizedEmail}" already exists with role ${existingUser.role}. Bootstrap cannot promote or overwrite existing non-admin accounts.`,
        );
      }
      return;
    }

    // Check if any admin already exists in the system
    const existingAdminCount = await this.prisma.user.count({
      where: { role: UserRole.ADMIN },
    });

    if (existingAdminCount > 0) {
      this.logger.warn(
        `An administrator account already exists in the system. Bootstrap provisions only the initial administrator and will not create additional administrators. Skipping bootstrap for "${normalizedEmail}".`,
      );
      return;
    }

    // Provision initial administrator with Argon2id
    try {
      const passwordHash = await argon2.hash(adminPassword, {
        type: argon2.argon2id,
      });

      await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          name: adminName,
          role: UserRole.ADMIN,
        },
      });

      this.logger.log(
        `Initial administrator provisioned successfully for "${normalizedEmail}".`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to provision initial administrator for "${normalizedEmail}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Validates user credentials using Argon2id.
   * Returns generic 'Invalid credentials' on any error to avoid user enumeration.
   */
  async validateUser(email: string, pass: string): Promise<AuthenticatedUser> {
    if (!email || !pass || typeof email !== 'string' || typeof pass !== 'string') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Generic error; avoid revealing whether email exists
      throw new UnauthorizedException('Invalid credentials');
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await argon2.verify(user.passwordHash, pass);
    } catch {
      isPasswordValid = false;
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  /**
   * Generates a signed JWT for the authenticated user.
   */
  async generateToken(user: AuthenticatedUser): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return this.jwtService.signAsync(payload);
  }
}
