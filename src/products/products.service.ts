import { Injectable } from '@nestjs/common';
import { Products } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async findByName(productName: string): Promise<Products> {
    return this.productsRepository.findOne({where: {name: productName}});
  }
}
