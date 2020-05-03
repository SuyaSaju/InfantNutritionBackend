import { Brand } from '../Brand.entity';
import { IngredientProductResult } from '../brands.service';

class IngredientStats {
  ingredientName: string;
  productPercentage: number;

  constructor(ingredientName: string, productPercentage: number) {
    this.ingredientName = ingredientName;
    this.productPercentage = productPercentage;
  }
}

export class BrandIngredientDto {
  brand: Brand;
  stats: IngredientStats[];

  constructor(brand: Brand, ingredientProductResults: IngredientProductResult[], noOfProductsInBrand: number) {
    this.brand = brand;
    this.stats = ingredientProductResults.map(result =>
      new IngredientStats(result.ingredient, (result.productCount / noOfProductsInBrand) * 100),
    );
  }
}
