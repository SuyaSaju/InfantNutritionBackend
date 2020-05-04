import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {
  }

  @Get('ratingChanges')
  async getRatingsChange(@Query('startDate') startDate: Date, endDate: Date) {
    return this.statsService.getProductsWithMaxRatingsChange(startDate, endDate)
  }
}
