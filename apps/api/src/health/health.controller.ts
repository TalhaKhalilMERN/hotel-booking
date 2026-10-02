import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  checkHealth() {
    return {
      status: 'ok',
      service: 'hamilton-hotel-api',
      timestamp: new Date().toISOString(),
    };
  }
}
