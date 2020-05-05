import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Brand } from '../brands/Brand.entity';
import { Review } from '../products/entities/review.entity';
import { Rating } from '../products/entities/rating.entity';
import { Price } from '../products/entities/price.entity';
import { Sentiment } from '../products/entities/sentiment.entity';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [TypeOrmModule.forFeature([Rating, Price, Sentiment])],
})
export class StatsModule {}
