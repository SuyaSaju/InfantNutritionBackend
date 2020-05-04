import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './Brand.entity';
import { Product } from '../products/entities/product.entity';
import { Review } from '../products/entities/review.entity';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [TypeOrmModule.forFeature([Product, Brand, Review])],
})
export class BrandsModule {
}
