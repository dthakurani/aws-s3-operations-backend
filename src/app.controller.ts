import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/health')
  @ApiOperation({ summary: 'Get health of microservice with database status' })
  async getHealth() {
    return await this.appService.getHealth();
  }
}
