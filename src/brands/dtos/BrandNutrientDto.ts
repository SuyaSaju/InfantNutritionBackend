import { Brand } from '../Brand.entity';
import { NutrientProductResult } from '../brands.service';

class NutritientStats {
  nutritientName: string;
  productPercentage: number;

  constructor(nutritientName: string, productPercentage: number) {
    this.nutritientName = nutritientName;
    this.productPercentage = productPercentage;
  }
}

export class BrandNutrientDto {
  brand: Brand;
  stats: NutritientStats[];

  constructor(brand: Brand, nutrientProductResults: NutrientProductResult[], noOfProductsInBrand: number) {
    this.brand = brand;
    this.stats = nutrientProductResults.map(result =>
      new NutritientStats(result.nutrient, (result.productCount / noOfProductsInBrand) * 100),
    );
  }
}
