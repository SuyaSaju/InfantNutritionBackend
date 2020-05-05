import { Injectable } from '@nestjs/common';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Review } from './products/entities/review.entity';
import { Product } from './products/entities/product.entity';
import { Sentiment } from './products/entities/sentiment.entity';
import { Rating } from './products/entities/rating.entity';
import { Price } from './products/entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brands/Brand.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: MongoRepository<Product>,
    @InjectRepository(Brand)
    private readonly brandsRepository: MongoRepository<Brand>,
  ) {
  }

  async createReviewsCollection() {
    const ratingRepository = getMongoRepository(Review);
    const products = await this.productsRepository.find({ select: ['brandId', 'reviews', 'id'] });
    let count = 1;
    products.forEach((product: Product) => {
      if (product.reviews) {
        console.log(product);
        product.reviews.forEach((review) => {
          ratingRepository.insertOne({
            ...review,
            productId: product.id,
            brandId: product.brandId,
          });
          ++count;
        });
      }
    });
    return {
      'reviewsCollection': count + ' mock reviews are added to reviews collection!',
    };
  };

  async createSentimentCollection() {
    const sentimentRepository = getMongoRepository(Sentiment);
    const products = await this.productsRepository.find({ select: ['sentiment', 'id'] });
    let count = 1;
    const randomDate = this.createAPastDate();

    products.forEach((product: Product) => {
      if (product.sentiment) {
        sentimentRepository.insertOne({
          ...product.sentiment,
          productId: product.id,
          date: randomDate,
        });
        ++count;
      }
    });
    const sentiments = await sentimentRepository.find();
    sentiments.forEach((sentiment: Sentiment) => {
      for (let i = 1; i < 4; i++) {
        delete sentiment.id;
        randomDate.setDate(randomDate.getDate() + this.random(1, 25));
        sentiment.compound = Math.random();
        sentiment.positive = Math.random();
        sentiment.negative = Math.random();
        sentiment.neutral = Math.random();
        sentiment.date = randomDate;
        sentimentRepository.insertOne({
          ...sentiment,
        });
        ++count;
      }
    });
    return {
      'sentimentsCollection': count + ' mock sentiments are added to sentiments collection!',
    };
  };

  async createPriceCollection() {
    const priceRepository = getMongoRepository(Price);
    const products = await this.productsRepository.find({ select: ['price', 'id'] });
    let count = 1;
    const randomDate = this.createAPastDate();

    products.forEach((product: Product) => {
      if (product.price) {
        priceRepository.insertOne({
          ...product.price,
          productId: product.id,
          date: randomDate,
        });
        ++count;
      }
    });
    const prices = await priceRepository.find();
    prices.forEach((price: Price) => {
      for (let i = 1; i < 4; i++) {
        randomDate.setDate(randomDate.getDate() + this.random(1, 25));
        const newPrice = {
          amount: price.amount + this.random(1, 10),
          productId: price.productId,
          currency: price.currency,
          date: randomDate,
        };

        priceRepository.insertOne({
          ...newPrice,
        });
        ++count;
      }
    });
    return {
      'pricesCollection': count + ' mock prices are added to price collection!',
    };

  };

  async createRatingsCollection() {
    const ratingRepository = getMongoRepository(Rating);
    const products = await this.productsRepository.find({ select: ['brandId', 'rating', 'id'] });
    let count = 1;
    const randomDate = this.createAPastDate();

    products.forEach((product: Product) => {
      if (product.rating) {
        ratingRepository.insertOne({
          ...product.rating,
          productId: product.id,
          brandId: product.brandId,
          date: randomDate,
        });
        ++count;
      }
    });
    const ratings = await ratingRepository.find();
    ratings.forEach((rating: Rating) => {
      for (let i = 1; i < 4; i++) {
        randomDate.setDate(randomDate.getDate() + this.random(1, 25));
        if (rating.overall != 5) {
          rating.overall = this.random(0, 5);
        }
        rating.date = randomDate;

        ratingRepository.insertOne({
          ...rating,
        });
        ++count;
      }
    });
    return {
      'ratingsCollection': count + ' mock ratings are added to ratings collection!',
    };
  };

  async updateBrandIdInProductCollection() {
    const products = await this.productsRepository.aggregate([
      { $project: { name: 1, brand: 1, id: 1 } },
    ]).toArray();
    const brands = await this.brandsRepository.aggregate([]).toArray();
    const brandMap = new Map();
    brands.forEach((brand) => {
      brandMap.set(brand.name, brand._id);
    });

    const productBrandMap = new Map();
    products.forEach((product) => {
      if (brandMap.has(product.brand)) {
        productBrandMap.set(product._id, brandMap.get(product.brand));
      }
    });
    productBrandMap.forEach((value, key) => {
      this.productsRepository.updateOne(
        {
          _id: key,
        },
        {
          $set: { 'brandId': value },
        });
    });
    return {
      'productsCollection': productBrandMap.size + ' products are updated with brand id!',
    };

  }

  private random(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  private createAPastDate() {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - 30);
    return randomDate;
  };
}
