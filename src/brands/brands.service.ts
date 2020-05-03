import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { MongoRepository, Repository } from 'typeorm';
import { BrandNutrientDto } from './dtos/BrandNutrientDto';
import { Brand } from './Brand.entity';
import { BrandIngredientDto } from './dtos/BrandIngredientDto';

export interface NutrientProductResult {
  productCount: number;
  nutrient: string;
}

export interface IngredientProductResult {
  productCount: number;
  ingredient: string;
}

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productsRepository: MongoRepository<Product>,
  ) {
  }

  async findNutrientsPerBrand(): Promise<BrandNutrientDto[]> {
    const brands = await this.getAllBrands();
    return Promise.all(brands.map(async brand => {
      const noOfProductsInBrand = await this.getProductCountFor(brand.name);
      const nutrientProductResults: NutrientProductResult[] = await this.productsRepository.aggregate([
        { $match: { brand: brand.name, nutrients: { $exists: true, $ne: [] } } },
        { $project: { 'nutrients.name': 1, 'nutrients.amount': 1 } },
        { $unwind: '$nutrients' },
        { $match: { 'nutrients.amount': { $ne: '0' } } },
        { $group: { _id: '$nutrients.name', productCount: { $sum: 1 } } },
        { $project: { _id: 0, nutrient: '$_id', productCount: 1 } },
      ], {}).toArray();
      return new BrandNutrientDto(brand, nutrientProductResults, noOfProductsInBrand);
    }));
  }

  async findIngredientsPerBrand(): Promise<BrandIngredientDto[]> {
    const brands = await this.getAllBrands();
    return Promise.all(brands.map(async brand => {
      const noOfProductsInBrand = await this.getProductCountFor(brand.name);
      const ingredientProductResults: IngredientProductResult[] = await this.productsRepository.aggregate([
        { $match: { brand: brand.name, ingredients: { $exists: true, $ne: [] } } },
        { $project: { 'ingredients.name': 1, 'ingredients.amount': 1 } },
        { $unwind: '$ingredients' },
        { $group: { _id: '$ingredients.name', productCount: { $sum: 1 } } },
        { $project: { _id: 0, ingredient: '$_id', productCount: 1 } },
      ], {}).toArray();
      return new BrandIngredientDto(brand, ingredientProductResults, noOfProductsInBrand);
    }));
  }

  private getAllBrands(): Promise<Brand[]> {
    return this.brandsRepository.find();
  }

  private getProductCountFor(brandName: string): Promise<number> {
    return this.productsRepository.count({ brand: brandName });
  }
}
