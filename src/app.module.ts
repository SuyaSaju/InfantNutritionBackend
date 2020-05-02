import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      "type": "mongodb",
      "host": "54.166.234.235",
      "port": 27017,
      "database": "nutrition",
      "username": "test",
      "password": "test",
      "entities": [Product],
      "extra": {
        "authSource": "admin"
      }
    }
  ), ProductsModule],
  controllers: [AppController],
})
export class AppModule {}
