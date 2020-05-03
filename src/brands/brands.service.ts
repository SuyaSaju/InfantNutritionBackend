import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { MongoRepository, Repository } from 'typeorm';
import { Brand } from './Brand';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productsRepository: MongoRepository<Product>,
  ) {
  }

  async findNutrientsPerBrand(): Promise<Brand[]> {
    return this.brandsRepository.find();
  }
}
