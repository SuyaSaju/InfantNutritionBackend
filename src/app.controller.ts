import { Controller, Get } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { Product } from './products/product.entity';
import { Brand } from './brands/Brand.entity';
import {
  createPriceCollection,
  createRatingsCollection,
  createReviewsCollection, createSentimentCollection,
  updateBrandIdInProductCollection,
} from './migration';

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
    // await updateBrandIdInProductCollection(productRepository, brandRepository);
    // await createRatingsCollection(productRepository);
    await createReviewsCollection(productRepository);
    // await createPriceCollection(productRepository);
    // await createSentimentCollection(productRepository);
    return 'products';
  }
}
