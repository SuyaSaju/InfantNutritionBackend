import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Brand } from '../brands/Brand.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Review])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
}
