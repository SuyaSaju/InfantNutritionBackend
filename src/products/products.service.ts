import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchDto } from './SearchDto';
import { ObjectID } from 'mongodb';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {
  }

  async searchBy(productName: string, brand: string, offset: number, limit: number): Promise<SearchDto> {
    let filterCondition = {};
    if (productName) {
      filterCondition = { ...filterCondition, name: productName };
    }
    if (brand !== undefined) {
      filterCondition = { ...filterCondition, brand: brand || { $exists: false } };
    }
    const totalResults = await this.productsRepository.count(filterCondition);
    const products = await this.productsRepository.find({ where: filterCondition, skip: offset, take: limit });
    if (products.length) return new SearchDto(products, offset, limit, totalResults);
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
