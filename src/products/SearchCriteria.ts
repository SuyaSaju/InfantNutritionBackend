import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchCriteria {
  @ApiPropertyOptional({ description: 'Name of the product' })
  readonly name: string;
  @ApiPropertyOptional({ description: 'Brand of the product. If brand= is explicity passed as query param, matches with products having no brand. If no brand is passed, ignores the brand from search criteria' })
  readonly brand: string;
  @ApiPropertyOptional({ description: 'Start index of the products to be fetched to support pagination' })
  readonly offset: number;
  @ApiPropertyOptional({ description: 'Number of products to be fetched in this request. Defaults to 5', default: 5 })
  readonly limit: number = 5;
}
