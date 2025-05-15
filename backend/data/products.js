const products = [
  {
    name: 'Premium Cotton T-Shirt',
    description: 'A comfortable, everyday t-shirt made from 100% premium cotton. Features a relaxed fit and durability that will last through many washes.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
      'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg'
    ],
    category: 'T-Shirts',
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    inStock: true,
    featured: true,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a touch of stretch for comfort. Perfect for casual wear or dressing up for a night out.',
    price: 59.99,
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg'
    ],
    category: 'Jeans',
    gender: 'men',
    sizes: ['30x30', '32x30', '34x30', '36x30', '38x30'],
    colors: ['Blue', 'Black', 'Gray'],
    inStock: true,
    featured: true,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'High-Waisted Dress Pants',
    description: 'Elegant high-waisted dress pants for a professional look. Made with a comfortable stretch fabric that moves with you.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/6765514/pexels-photo-6765514.jpeg',
      'https://images.pexels.com/photos/6765515/pexels-photo-6765515.jpeg'
    ],
    category: 'Pants',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Beige'],
    inStock: true,
    featured: false,
    rating: 4.7,
    numReviews: 10,
  },
  {
    name: 'Casual Button-Down Shirt',
    description: 'A versatile button-down shirt perfect for work or casual outings. Made from lightweight, breathable fabric for all-day comfort.',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg'
    ],
    category: 'Shirts',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Black', 'Striped'],
    inStock: true,
    featured: true,
    rating: 4.3,
    numReviews: 15,
  },
  {
    name: 'Summer Floral Dress',
    description: 'A light and breezy summer dress with a beautiful floral pattern. Perfect for beach days or casual summer outings.',
    price: 69.99,
    images: [
      'https://images.pexels.com/photos/7586603/pexels-photo-7586603.jpeg',
      'https://images.pexels.com/photos/6765186/pexels-photo-6765186.jpeg'
    ],
    category: 'Dresses',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Blue', 'Floral Pink', 'Floral White'],
    inStock: true,
    featured: true,
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: 'Athletic Performance Hoodie',
    description: 'A technical performance hoodie designed for workouts and active lifestyles. Features moisture-wicking fabric and a comfortable fit.',
    price: 64.99,
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      'https://images.pexels.com/photos/6311600/pexels-photo-6311600.jpeg'
    ],
    category: 'Activewear',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy', 'Red'],
    inStock: true,
    featured: false,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'Classic Wool Sweater',
    description: 'A timeless wool sweater that provides warmth and style. Perfect for layering during colder months.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/6764035/pexels-photo-6764035.jpeg',
      'https://images.pexels.com/photos/6311471/pexels-photo-6311471.jpeg'
    ],
    category: 'Sweaters',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Navy', 'Gray', 'Black'],
    inStock: true,
    featured: true,
    rating: 4.4,
    numReviews: 14,
  },
  {
    name: 'Leather Jacket',
    description: 'A classic leather jacket that adds edge to any outfit. Made from high-quality leather with a comfortable lining.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/7691283/pexels-photo-7691283.jpeg'
    ],
    category: 'Jackets',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    inStock: true,
    featured: true,
    rating: 4.9,
    numReviews: 25,
  },
];

export default products;