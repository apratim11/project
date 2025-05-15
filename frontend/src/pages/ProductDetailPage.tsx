import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ChevronRight, ShoppingBag, Star, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { api } from '../utils/api';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        const data = await api.get<Product>(`/api/products/${id}`);
        setProduct(data);
        
        // Set default selections
        if (data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) {
      toast.error('Maximum quantity is 10');
      return;
    }
    setQuantity(newQuantity);
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-secondary-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-secondary-200 rounded w-3/4"></div>
              <div className="h-6 bg-secondary-200 rounded w-1/4"></div>
              <div className="h-4 bg-secondary-200 rounded w-full"></div>
              <div className="h-4 bg-secondary-200 rounded w-full"></div>
              <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
              <div className="h-10 bg-secondary-200 rounded w-1/3 mt-8"></div>
              <div className="h-12 bg-secondary-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex text-sm">
          <li className="flex items-center">
            <Link to="/" className="text-secondary-500 hover:text-primary-600">
              Home
            </Link>
            <ChevronRight size={16} className="mx-2 text-secondary-400" />
          </li>
          <li className="flex items-center">
            <Link to="/products" className="text-secondary-500 hover:text-primary-600">
              Products
            </Link>
            <ChevronRight size={16} className="mx-2 text-secondary-400" />
          </li>
          <li className="text-secondary-700 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="bg-white p-4 rounded-lg overflow-hidden">
            <div className="relative pb-[100%] rounded-lg overflow-hidden bg-secondary-50">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="absolute w-full h-full object-cover object-center"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-md border-2 ${
                      index === currentImageIndex
                        ? 'border-primary-600'
                        : 'border-secondary-200'
                    } overflow-hidden`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">{product.name}</h1>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center text-accent-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      className={i < Math.floor(product.rating) ? '' : 'text-secondary-300'}
                    />
                  ))}
                  <span className="ml-2 text-secondary-700">{product.rating}</span>
                </div>
                <span className="mx-2 text-secondary-300">|</span>
                <span className="text-secondary-600">{product.numReviews} reviews</span>
              </div>
              
              <p className="text-2xl font-bold text-primary-600 mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
            
            <p className="text-secondary-700">{product.description}</p>
            
            <div>
              <h3 className="font-medium text-secondary-900 mb-2">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-secondary-200'
                    } transition-all`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-secondary-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-secondary-300 text-secondary-700 hover:border-primary-300'
                    } transition-all`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-secondary-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 border border-secondary-300 rounded-l-md flex items-center justify-center text-secondary-600 hover:bg-secondary-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 h-10 border-y border-secondary-300 text-center focus:outline-none"
                  min="1"
                  max="10"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 border border-secondary-300 rounded-r-md flex items-center justify-center text-secondary-600 hover:bg-secondary-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 py-3"
                disabled={!product.inStock}
              >
                <ShoppingBag size={18} className="mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button className="btn btn-secondary py-3">
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </button>
            </div>
            
            <div className="border-t border-secondary-200 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-secondary-500">Category</span>
                  <span className="font-medium text-secondary-900">{product.category}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary-500">Gender</span>
                  <span className="font-medium text-secondary-900 capitalize">{product.gender}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;