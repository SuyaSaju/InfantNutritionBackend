import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { BrandsModule } from './brands/brands.module';
import { Rating } from './products/rating.entity';
import { Brand } from './brands/Brand.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      'type': 'mongodb',
      'host': '192.168.0.5',
      'port': 27017,
      'database': 'nutrition',
      'username': 'test',
      'password': 'test',
      'entities': [Product, Brand, Rating],
      'extra': {
        'authSource': 'admin',
      },
    },
  ), ProductsModule, BrandsModule],
  controllers: [AppController],
})
export class AppModule {
}
