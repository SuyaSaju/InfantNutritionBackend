import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Rating } from '../products/entities/rating.entity';
import { Price } from '../products/entities/price.entity';
import { Sentiment } from '../products/entities/sentiment.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: MongoRepository<Rating>,
    @InjectRepository(Sentiment)
    private readonly sentimentsRepository: MongoRepository<Sentiment>,
    @InjectRepository(Price)
    private readonly pricesRepository: MongoRepository<Price>,
  ) {
  }

  async getProductsWithMaxRatingsChange(startDate: string, endDate: string): Promise<any> {
    return this.ratingsRepository.aggregate([
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
  }

  async getProductsWithMaxPriceChange(startDate: string, endDate: string): Promise<any> {
    return this.pricesRepository.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lt: new Date(endDate) }, amount: { $ne: null } } },
      { $group: { _id: '$productId', maxValue: { $max: '$amount' }, minValue: { $min: '$amount' } } },
      { $project: { priceDifference: { $subtract: ['$maxValue', '$minValue'] }, _id: 1 } },
      { $sort: { priceDifference: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $project: { priceDifference: 1, _id: 1, 'product.name': 1 } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$product', 0] }, '$$ROOT'] } } },
      { $project: { priceDifference: 1, _id: 1, name: 1 } },
    ]).toArray();
  }

  async getProductsWithSentimentChanges(startDate: string, endDate: string): Promise<any> {
    return this.sentimentsRepository.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lt: new Date(endDate) } } },
      { $project: { productId: 1, sentiment: { $divide: [ { $sum: [ '$positive', '$negative','$neutral','$compound' ] }, 4 ] } } },
      { $group: { _id: '$productId', maxValue: { $max: "$sentiment" }, minValue: { $min: "$sentiment"} } },
      { $project: { sentimentDifference: { $subtract: ['$maxValue', '$minValue'] }, _id: 1 } },
      { $sort: { sentimentDifference: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $project: { sentimentDifference: 1, _id: 1, 'product.name': 1 } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$product', 0] }, '$$ROOT'] } } },
      { $project: { sentimentDifference: 1, _id: 1, name: 1 } },
    ]).toArray();
  }
}
