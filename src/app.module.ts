import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Brand } from './brands/Brand.entity';
import { Rating } from './products/entities/rating.entity';
import { Sentiment } from './products/entities/sentiment.entity';
import { Price } from './products/entities/price.entity';
import { Review } from './products/entities/review.entity';
import { BrandsModule } from './brands/brands.module';
import { StatsModule } from './stats/stats.module';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
      'type': 'mongodb',
      'host': 'localhost',
      'port': 27017,
      'database': 'nutrition_v1',
      'username': 'test',
      'password': 'test',
      'entities': [Product, Brand, Rating, Review, Price, Sentiment],
      'extra': {
        'authSource': 'admin',
      },
    },
  ), ProductsModule, BrandsModule, StatsModule, TypeOrmModule.forFeature([Product, Brand])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
