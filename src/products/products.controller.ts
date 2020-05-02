import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './product.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async searchProduct(@Query('name') productName: string): Promise<Products> {
    return this.productsService.findByName(productName)
  }
}
