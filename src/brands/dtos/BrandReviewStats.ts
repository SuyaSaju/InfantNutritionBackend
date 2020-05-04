import { Brand } from '../Brand.entity';
import { ReviewSentiment } from '../../products/entities/review.entity';

export class BrandReviewStats {
  brand: Brand;
  reviewsCount: number;
  positiveReviewsCount: number;
  negativeReviewsCount: number;
  neutralReviewsCount: number;
  averageReviewSentiment: number;

  constructor(brand: Brand, sentiments: ReviewSentiment[]) {
    this.brand = brand;
    this.reviewsCount = sentiments.length;
    if (!this.reviewsCount) return;
    this.positiveReviewsCount = 0;
    this.negativeReviewsCount = 0;
    this.neutralReviewsCount = 0;
    sentiments.forEach(sentiment => {
      if (sentiment.positive > 0) this.positiveReviewsCount += 1;
      if (sentiment.negative > 0) this.negativeReviewsCount += 1;
      if (sentiment.neutral > 0) this.neutralReviewsCount += 1;
    });
    this.averageReviewSentiment = (this.positiveReviewsCount + this.negativeReviewsCount + this.neutralReviewsCount) / 3;
  }
}
