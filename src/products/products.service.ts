import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchDto } from './SearchDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
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
}
