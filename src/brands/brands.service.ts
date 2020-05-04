import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { BrandNutrientDto } from './dtos/BrandNutrientDto';
import { Brand } from './Brand.entity';
import { BrandIngredientDto } from './dtos/BrandIngredientDto';
import { BrandReviewStats } from './dtos/BrandReviewStats';
import { Review, ReviewSentiment } from '../products/entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { BrandRatingsCount } from './dtos/BrandRatingsCount';
import { Rating } from '../products/entities/rating.entity';
import { Timeline } from './Timeline';

export interface NutrientProductResult {
  productCount: number;
  nutrient: string;
}

export interface IngredientProductResult {
  productCount: number;
  ingredient: string;
}

interface BrandSentiments {
  _id: string;
  sentiments: ReviewSentiment[]
}

interface BrandRatingCount {
  _id: string;
  count: number;
}

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productsRepository: MongoRepository<Product>,
    @InjectRepository(Review)
    private readonly reviewsRepository: MongoRepository<Review>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: MongoRepository<Rating>,
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

  async getReviewStats(startDate: string, endDate: string): Promise<BrandReviewStats[]> {
    const brandSentimentsInTimeRange: BrandSentiments[] = await this.reviewsRepository.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: '$brandId', sentiments: { $push: '$sentiment' } } },
    ]).toArray();
    const brands = await this.getAllBrands();
    return brands.map(brand => {
      const brandSentiments = brandSentimentsInTimeRange.find(brandSentiments => {
        return brandSentiments._id == brand.id.toString();
      });
      if (!brandSentiments) return new BrandReviewStats(brand, []);
      return new BrandReviewStats(brand, brandSentiments.sentiments);
    });
  }

  async getBrandRatingsCount(timeline: Timeline): Promise<BrandRatingsCount[]> {
    const brandRatingCounts: BrandRatingCount[] = await this.ratingsRepository.aggregate([
      { $match: { date: { $gte: new Date(timeline.startDate), $lte: new Date(timeline.endDate) } } },
      { $group: { _id: '$brandId', count: { $sum: 1 } } },
    ]).toArray();
    const brands = await this.getAllBrands();
    return brands.map(brand => {
      const brandRating = brandRatingCounts.find(brandRating => {
        return brandRating._id == brand.id.toString();
      });
      if (!brandRating) return new BrandRatingsCount(brand, 0);
      return new BrandRatingsCount(brand, brandRating.count);
    });
  }

  private getAllBrands(): Promise<Brand[]> {
    return this.brandsRepository.find();
  }

  private getProductCountFor(brandName: string): Promise<number> {
    return this.productsRepository.count({ brand: brandName });
  }
}
