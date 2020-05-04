import { Product } from './entities/product.entity';

class MetaData {
  readonly offset: number
  readonly limit: number
  readonly totalResults: number

  constructor(offset: number, limit: number, totalResults: number) {
    this.offset = offset
    this.limit = limit
    this.totalResults = totalResults
  }
}

export class SearchResults {
  readonly results: Product[]
  readonly metadata: MetaData

  constructor(results: Product[], offset: number, limit: number, totalResults: number) {
    this.results = results
    this.metadata = new MetaData(offset, limit, totalResults)
  }
}
