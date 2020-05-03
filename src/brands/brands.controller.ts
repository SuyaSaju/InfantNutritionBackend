import { Controller, Get } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from './Brand';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {
  }

  @Get('nutrients')
  async findNutrientsPerBrand(): Promise<Brand[]> {
    return this.brandsService.findNutrientsPerBrand()
  }
}
