import { Controller, Get } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandNutrientDto } from './dtos/BrandNutrientDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { BrandIngredientDto } from './dtos/BrandIngredientDto';

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
}
