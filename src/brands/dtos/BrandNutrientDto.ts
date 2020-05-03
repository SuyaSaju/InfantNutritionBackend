import { Brand } from '../Brand.entity';
import { NutrientProductResult } from '../brands.service';

class NutritientStats {
  name: string;
  productPercentage: number;

  constructor(name: string, productPercentage: number) {
    this.name = name;
    this.productPercentage = productPercentage;
  }
}

export class BrandNutrientDto {
  brand: Brand;
  nutrientStats: NutritientStats[];

  constructor(brand: Brand, nutrientProductResults: NutrientProductResult[], noOfProductsInBrand: number) {
    this.brand = brand;
    this.nutrientStats = nutrientProductResults.map(result =>
      new NutritientStats(result.nutrient, (result.productCount / noOfProductsInBrand) * 100),
    );
  }
}
