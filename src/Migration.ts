import { getMongoRepository } from 'typeorm';
import { Rating } from './products/rating.entity';
import { Product } from './products/product.entity';

export const createReviewsCollection = async (productRepository, brandRepository) => {
  const ratingRepository = getMongoRepository(Rating);
}

export const createRatingsCollection = async (productRepository, brandRepository) => {
  const ratingRepository = getMongoRepository(Rating);
  const products = await productRepository.find({select: ['brandId', 'rating', 'id']})
  let count = 1
  products.forEach((product : Product) => {
    console.log(product)
    if(product.rating) {
      ratingRepository.insertOne({
        overall: product.rating.overall,
        total: product.rating.total,
        fiveStars: product.rating.fiveStars,
        fourStars: product.rating.fourStars,
        threeStars: product.rating.fourStars,
        twoStars: product.rating.twoStars,
        oneStars: product.rating.oneStars,
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
    console.log(`update - ${key} : ${value}`);
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
