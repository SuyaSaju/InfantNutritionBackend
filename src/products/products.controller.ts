import { Controller, Get, NotFoundException, Param, Query, Response } from '@nestjs/common';
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

  @Get('/products/:productId/images/:imageId')
  async getImage(@Param('productId') productId: string, @Response() res, @Param('imageId') imageId: string) {
    const image = await this.productsService.findById(productId, imageId);
    console.log('image '+ image)
    if(image)
      res.code(200)
        .type('image/png').send(image.photos[0].data.buffer)
    else
      res.code(404).send('Image not found')
  }
}
