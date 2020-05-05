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
    this.averageReviewSentiment = 0;
    sentiments.forEach(sentiment => {
      const maximumWeight = Math.max(sentiment.positive, sentiment.neutral, sentiment.negative);
      if (sentiment.positive === maximumWeight) {
        this.averageReviewSentiment += sentiment.positive;
        this.positiveReviewsCount += 1;
      }
      else if (sentiment.negative  === maximumWeight) {
        this.averageReviewSentiment += sentiment.negative;
        this.negativeReviewsCount += 1;
      }
      else if (sentiment.neutral === maximumWeight) {
        this.averageReviewSentiment += sentiment.neutral;
        this.neutralReviewsCount += 1;
      }
    });
    this.averageReviewSentiment = this.averageReviewSentiment / this.reviewsCount;
  }
}
