import { Controller, Get, Header, Param, Query, Response } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchResults } from './SearchResults';
import { SearchCriteria } from './SearchCriteria';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'Returns the list of products and the metadata information to help in pagination',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found Exception when there are no products matching the search criteria',
  })
  async searchProduct(@Query() searchCriteria: SearchCriteria): Promise<SearchResults> {
    return this.productsService.searchBy(searchCriteria);
  }

  @Header('Content-Type', 'image/png')
  @Get('/products/:productId/images/:imageId')
  async getImage(@Param('productId') productId: string, @Param('imageId') imageId: string) {
    return this.productsService.findByImage(productId, imageId);
  }
}
