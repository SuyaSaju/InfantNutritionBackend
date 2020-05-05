import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getProductName(): string {
    return 'Infant Nutrition';
  }

  @Get('migrate')
  async migrate() {
    const brandIdResults = await this.appService.updateBrandIdInProductCollection();
    const ratingsResult = await this.appService.createRatingsCollection();
    const reviewsResult = await this.appService.createReviewsCollection();
    const pricesResult = await this.appService.createPriceCollection();
    const sentimentsResult = await this.appService.createSentimentCollection();

    return {
      ...brandIdResults,
      ...sentimentsResult,
      ...reviewsResult,
      ...ratingsResult,
      ...pricesResult
    };
  }
}
