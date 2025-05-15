import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { api } from '../utils/api';
import { Product } from '../types';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.get<Product[]>('/products/featured');
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1100790/pexels-photo-1100790.jpeg" 
            alt="Fashion model" 
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <motion.div 
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Elevate Your Style
            </h1>
            <p className="text-lg md:text-xl mb-8 text-secondary-100">
              Discover our latest collection of premium clothing designed for comfort and elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/products?featured=true" className="btn bg-white text-secondary-900 hover:bg-secondary-100">
                New Arrivals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="relative rounded-lg overflow-hidden h-80 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
                alt="Men's Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">Men</h3>
                <Link
                  to="/products?gender=men"
                  className="inline-flex items-center text-white hover:text-primary-300 transition-colors"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-80 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg"
                alt="Women's Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">Women</h3>
                <Link
                  to="/products?gender=women"
                  className="inline-flex items-center text-white hover:text-primary-300 transition-colors"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-80 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg"
                alt="Accessories Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                <Link
                  to="/products?category=Accessories"
                  className="inline-flex items-center text-white hover:text-primary-300 transition-colors"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/products"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <span>View All</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm h-96 animate-pulse">
                  <div className="bg-secondary-200 h-64 w-full"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                    <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
                    <div className="h-4 bg-secondary-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-secondary-600">
                Our clothing is crafted from high-quality materials for durability and comfort.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-secondary-600">
                Enjoy free shipping on all orders over $100 within the continental US.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-secondary-600">
                Not satisfied? Return within 30 days for a full refund, no questions asked.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M16 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M12 20v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
              <p className="text-secondary-600">
                Shop with confidence using our secure payment options and encrypted checkout.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-primary-100 mb-8">
              Subscribe to receive updates on our latest arrivals and special offers.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="input flex-grow rounded-r-none sm:rounded-r-none"
                required
              />
              <button type="submit" className="btn bg-white text-primary-600 hover:bg-primary-50 rounded-l-none sm:rounded-l-none">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;