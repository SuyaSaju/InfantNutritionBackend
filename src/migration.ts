import { getMongoRepository } from 'typeorm';
import { Rating } from './products/rating.entity';
import { Product } from './products/product.entity';
import { Review } from './products/review.entity';
import { Price } from './products/price.entity';
import { Sentiment } from './products/sentiment.entity';

const random = (min, max) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createReviewsCollection = async (productRepository) => {
  const ratingRepository = getMongoRepository(Review);
  const products = await productRepository.find({select: ['brandId', 'reviews', 'id']})
  let count = 1;
  products.forEach((product : Product) => {
    if(product.reviews) {
      console.log(product)
      product.reviews.forEach((review) => {
        ratingRepository.insertOne({
          ...review,
          productId: product.id,
          brandId: product.brandId
        });
        ++count;
      })
    }
  });
  console.log(count + " reviews are added to `reviews` collection")
};

export const createSentimentCollection = async (productRepository) => {
  const sentimentRepository = getMongoRepository(Sentiment);
  const products = await productRepository.find({select: ['sentiment', 'id']})
  let count = 1;
  products.forEach((product : Product) => {
    console.log(product);
    if(product.sentiment) {
      sentimentRepository.insertOne({
        ...product.sentiment,
        productId: product.id,
      });
      ++count
    }
  });
  console.log(count + " sentiments data extracted from Product table to ratings table")
  return products

};

export const createPriceCollection = async (productRepository) => {
  const priceRepository = getMongoRepository(Price);
  const products = await productRepository.find({select: ['price', 'id']})
  let count = 1;
  const today = new Date();

  products.forEach((product : Product) => {
    if(product.price) {
      priceRepository.insertOne({
        ...product.price,
        productId: product.id,
        date: today
      });
      ++count
    }
  });
  const prices = await priceRepository.find()
  prices.forEach((price : Price) => {
    for(let i = 1; i < 4; i ++) {
      today.setDate(today.getDate() + 1);
      const newPrice = {
        amount: price.amount + random(1, 10),
        productId: price.productId,
        currency: price.currency,
        date: today,
      };

      priceRepository.insertOne({
        ...newPrice,
      });
      ++count
      console.log("new price: "+JSON.stringify(newPrice));
    }
  });
  console.log(count + " mock prices are added to Price table")
  return {
    "priceCollection" : count + " mock prices are added to price collection!"
  }

};

export const createRatingsCollection = async (productRepository) => {
  const ratingRepository = getMongoRepository(Rating);
  const products = await productRepository.find({select: ['brandId', 'rating', 'id']})
  let count = 1
  products.forEach((product : Product) => {
    console.log(product)
    if(product.rating) {
      ratingRepository.insertOne({
        ...product.rating,
        productId: product.id,
        brandId: product.brandId
      });
      ++count
    }
  });
  console.log(count + " ratings data extracted from Product table to ratings table")
  return products

}

export const updateBrandIdInProductCollection =  async (productRepository, brandRepository) => {
  const products = await productRepository.aggregate([
    { $project: { name: 1, brand: 1, id: 1 } },
  ]).toArray();
  const brands = await brandRepository.aggregate([]).toArray();
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
    productRepository.updateOne(
      {
        _id: key,
      },
      {
        $set: { 'brandId': value },
      });
  });
  console.log(`${productBrandMap.size} products are updated with brand id`);
  return productBrandMap;
}
