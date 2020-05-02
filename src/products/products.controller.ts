import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchDto } from './SearchDto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get('search')
  async searchProduct(@Query('name') productName: string,
                      @Query('brand') brand: string,
                      @Query('offset') offset: number,
                      @Query('limit') limit = 5): Promise<SearchDto> {
    return this.productsService.searchBy(productName, brand, Number(offset), Number(limit));
  }
}
