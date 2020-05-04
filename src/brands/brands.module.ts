import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { Brand } from './Brand.entity';
import { Review } from '../products/review.entity';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [TypeOrmModule.forFeature([Product, Brand, Review])],
})
export class BrandsModule {
}
