import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../brands/Brand.entity';
import { MongoRepository, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Review } from '../products/entities/review.entity';
import { Rating } from '../products/entities/rating.entity';
import { Price } from '../products/entities/price.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: MongoRepository<Rating>,
    @InjectRepository(Price)
    private readonly pricesRepository: MongoRepository<Price>,
  ) {
  }

  async getProductsWithMaxRatingsChange(startDate: string, endDate: string): Promise<ProductRatingDifference[]> {
    const ratings = await this.ratingsRepository.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lt: new Date(endDate) }, overall: { $ne: null } } },
      { $group: { _id: '$productId', maxValue: { $max: '$overall' }, minValue: { $min: '$overall' } } },
      { $project: { ratingDifference: { $subtract: ['$maxValue', '$minValue'] }, _id: 1 } },
      { $sort: { ratingDifference: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $project: { ratingDifference: 1, _id: 1, 'product.name': 1 } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$product', 0] }, '$$ROOT'] } } },
      { $project: { ratingDifference: 1, _id: 1, name: 1 } },
    ]).toArray();
    console.log(ratings);
    return ratings;
  }

  async getProductsWithMaxPriceChange(startDate: string, endDate: string) {
    const ratings = await this.pricesRepository.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lt: new Date(endDate) }, overall: { $ne: null } } },
      { $group: { _id: '$productId', maxValue: { $max: 'price' }, minValue: { $min: 'price' } } },
      { $project: { ratingDifference: { $subtract: ['$maxValue', '$minValue'] }, _id: 1 } },
      { $sort: { ratingDifference: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $project: { ratingDifference: 1, _id: 1, 'product.name': 1 } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$product', 0] }, '$$ROOT'] } } },
      { $project: { ratingDifference: 1, _id: 1, name: 1 } },
    ]);
    console.log('=====');
    console.log(ratings.toArray());
    return ratings.toArray();
  }
}

export interface ProductRatingDifference {
  name: string,
  ratingDifference: number
}
