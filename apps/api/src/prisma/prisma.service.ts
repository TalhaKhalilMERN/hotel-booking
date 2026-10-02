import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to PostgreSQL database.');
    } catch (error) {
      this.logger.warn(
        'Could not connect to PostgreSQL database at localhost:5432. Health endpoint remains online. Run "npm run db:up" or "docker compose up -d" to start Postgres.',
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
