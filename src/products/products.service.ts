import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { SearchResults } from './SearchResults';
import { SearchCriteria } from './SearchCriteria';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
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
    const products = await this.productsRepository.find({ where: filterCondition, skip: Number(searchCriteria.offset), take: Number(searchCriteria.limit) });
    if (products.length) return new SearchResults(products, searchCriteria.offset, searchCriteria.limit, totalResults);
    throw new NotFoundException('', 'No products found that satisfies the given search criteria');
  }

  async findById(productId: string, imageId: string): Promise<Product> {
    return this.productsRepository.findOne({ where:
        {
          _id: ObjectID(productId),
          'photos._id':  ObjectID(imageId)
        }
    });
  }
}
