import { Controller, Get } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { Brand } from './brands/Brand.entity';
import {
  createPriceCollection,
  createRatingsCollection,
  createReviewsCollection, createSentimentCollection,
  updateBrandIdInProductCollection,
} from './migration';
import { Product } from './products/entities/product.entity';

@Controller()
export class AppController {

  @Get()
  getProductName(): string {
    return 'Infant Nutrition';
  }

  @Get('migrate')
  async migrate() {
    const productRepository = getMongoRepository(Product);
    const brandRepository = getMongoRepository(Brand);

    const brandIdResults = await updateBrandIdInProductCollection(productRepository, brandRepository);
    const ratingsResult = await createRatingsCollection(productRepository);
    const reviewsResult = await createReviewsCollection(productRepository);
    const pricesResult = await createPriceCollection(productRepository);
    const sentimentsResult = await createSentimentCollection(productRepository);

    return {
      ...brandIdResults,
      ...sentimentsResult,
      ...reviewsResult,
      ...ratingsResult,
      ...pricesResult
    };
  }
}
