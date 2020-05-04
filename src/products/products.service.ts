import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { SearchResults } from './SearchResults';
import { SearchCriteria } from './SearchCriteria';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: MongoRepository<Product>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {
  }

  async searchBy(searchCriteria: SearchCriteria): Promise<SearchResults> {
    let filterCondition = {};
    if (searchCriteria.name) {
      filterCondition = { ...filterCondition, name: searchCriteria.name };
    }
    if (searchCriteria.brand !== undefined) {
      filterCondition = { ...filterCondition, brand: searchCriteria.brand || { $exists: false } };
    }
    const totalResults = await this.productsRepository.count(filterCondition);
    const products = await this.productsRepository.find({
      where: filterCondition,
      skip: Number(searchCriteria.offset),
      take: Number(searchCriteria.limit),
      select: ['name', 'brand', 'description'],
    });
    if (products.length) return new SearchResults(products, searchCriteria.offset, searchCriteria.limit, totalResults);
    throw new NotFoundException('', 'No products found that satisfies the given search criteria');
  }

  async getReviews(productId: string): Promise<Review[]> {
    return this.reviewsRepository.find({ where: { productId: ObjectID(productId) } });
  }

  async findByImage(productId: string, imageId: string): Promise<Buffer> {
    try {
      const product = await this.productsRepository.findOne({
        where:
          {
            _id: ObjectID(productId),
            'photos._id': ObjectID(imageId),
          },
      });
      if (product && product.photos && product.photos[0] && product.photos[0].data) {
        const buffer = product.photos[0].data.buffer;
        return Promise.resolve(buffer);
      }
      return Promise.resolve(null);
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  async getProduct(productId: string): Promise<any> {
    try {
      const product = await this.productsRepository.aggregate([
        { $match: { _id: ObjectID(productId)}},
        { $project: { name: 1, description: 1, descriptionDetail: 1, ingredients: 1, nutrients: 1, productUrl: 1, 'photos._id': 1, topics: 1}},
        { $lookup: { from: 'prices', localField: '_id', foreignField: 'productId', as: 'prices' } },
        { $lookup: { from: 'ratings', localField: '_id', foreignField: 'productId', as: 'ratings' } },
        { $lookup: { from: 'sentiments', localField: '_id', foreignField: 'productId', as: 'sentiments' } },
        { $lookup: { from: 'reviews', localField: '_id', foreignField: 'productId', as: 'reviews' } },
      ]).toArray();
      if (!product.length) throw new NotFoundException('','Product not found for the given id')
      return product[0]
    } catch (e) {
      throw new NotFoundException('','Product not found for the given id')
    }
  }
}
