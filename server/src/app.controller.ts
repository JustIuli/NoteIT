import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Guest } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Guest()
  @Get()
  app() {
    return 'hi';
  }

  @Guest()
  @Get('health')
  @ApiOperation({ summary: 'Get the health of the app' })
  @ApiResponse({
    status: 200,
    description: 'Returns the health status of the app',
    type: null,
    isArray: false,
  })
  @ApiTags('Health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('noteIt', 'http://localhost:3000'),
    ]);
  }
}
