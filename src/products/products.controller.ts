import { Controller, Get, Param, Query, Response } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchResults } from './SearchResults';
import { SearchCriteria } from './SearchCriteria';
import { ApiNotFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Review } from './entities/review.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the list of products and the metadata information to help in pagination',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found Exception when there are no products matching the search criteria',
  })
  @Get('search')
  async searchProduct(@Query() searchCriteria: SearchCriteria): Promise<SearchResults> {
    return this.productsService.searchBy(searchCriteria);
  }

  @ApiOkResponse({
    description: 'Returns the details of the product for the given product id with historical price, ratings, review and sentiments data',
  })
  @ApiNotFoundResponse({
    description: 'Not Found Exception when there is no product for the given id',
  })
  @Get('products/:productId')
  async getProduct(@Param('productId') productId: string): Promise<any> {
    return this.productsService.getProduct(productId);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the list of reviews associated to the product given a product id',
  })
  @Get('products/:productId/reviews')
  async getReviews(@Param('productId') productId: string): Promise<Review[]> {
    return this.productsService.getReviews(productId);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the product\'s image for the given productId and imageId',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found Exception when there are no images matching the given criteria',
  })
  @Get('/products/:productId/images/:imageId')
  async getImage(@Param('productId') productId: string, @Response() res, @Param('imageId') imageId: string) {
    const imageData = await this.productsService.findByImage(productId, imageId);
    if (imageData)
      res.code(200).type('image/png').send(imageData);
    else
      res.code(404).send({
        'statusCode': 404,
        'message': 'No image found that satisfies the given criteria',
      });
  }
}
