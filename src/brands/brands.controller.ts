import { Controller, Get, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandNutrientDto } from './dtos/BrandNutrientDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { BrandIngredientDto } from './dtos/BrandIngredientDto';
import { BrandReviewStats } from './dtos/BrandReviewStats';
import { BrandRatingsCount } from './dtos/BrandRatingsCount';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {
  }

  @ApiOkResponse({ description: 'Returns the product percentages for all nutrients present in each brand' })
  @Get('nutrients')
  async findNutrientsPerBrand(): Promise<BrandNutrientDto[]> {
    return this.brandsService.findNutrientsPerBrand();
  }

  @ApiOkResponse({ description: 'Returns the product percentages for all ingredients present in each brand' })
  @Get('ingredients')
  async findIngredientsPerBrand(): Promise<BrandIngredientDto[]> {
    return this.brandsService.findIngredientsPerBrand();
  }

  @ApiOkResponse({ description: 'Returns the stats of reviews in each brand for the specified time interval' })
  @Get('reviews')
  async getReviewStats(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<BrandReviewStats[]> {
    return this.brandsService.getReviewStats(startDate, endDate)
  }

  @ApiOkResponse({ description: 'Returns the number of ratings in each brand for the specified time interval' })
  @Get('ratings')
  async getBrandRatingsCount(@Query() startDate: Date, @Query() endDate: Date): Promise<BrandRatingsCount[]> {
    return this.brandsService.getBrandRatingsCount(startDate, endDate)
  }
}
