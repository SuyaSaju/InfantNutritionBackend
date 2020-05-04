import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {
  }

  @ApiResponse({
    status: 200,
    description: 'Returns products with largest overall rating change in the provided time interval - returns top 10 results',
  })
  @Get('ratingChanges')
  async getRatingsChange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    const ratingsChange = await this.statsService.getProductsWithMaxRatingsChange(startDate, endDate);
    return ratingsChange
  }

  @Get('priceChanges')
  async getPriceChanges(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.statsService.getProductsWithMaxPriceChange(startDate, endDate)
  }
}
