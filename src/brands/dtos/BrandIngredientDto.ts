import { Brand } from '../Brand.entity';
import { IngredientProductResult } from '../brands.service';

class IngredientStats {
  name: string;
  productPercentage: number;

  constructor(name: string, productPercentage: number) {
    this.name = name;
    this.productPercentage = productPercentage;
  }
}

export class BrandIngredientDto {
  brand: Brand;
  ingredientStats: IngredientStats[];

  constructor(brand: Brand, ingredientProductResults: IngredientProductResult[], noOfProductsInBrand: number) {
    this.brand = brand;
    this.ingredientStats = ingredientProductResults.map(result =>
      new IngredientStats(result.ingredient, (result.productCount / noOfProductsInBrand) * 100),
    );
  }
}
