import { Brand } from '../Brand.entity';

export class BrandRatingsCount {
  brand: Brand;
  ratingsCount: number;

  constructor(brand: Brand, ratingsCount: number) {
    this.brand = brand;
    this.ratingsCount = ratingsCount;
  }
}
