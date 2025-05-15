import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { api } from '../utils/api';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || '');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || '',
  });

  const categories = [
    'T-Shirts',
    'Shirts',
    'Jeans',
    'Pants',
    'Dresses',
    'Sweaters',
    'Jackets',
    'Activewear',
    'Accessories',
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const params = Object.fromEntries(searchParams.entries());
      const data = await api.get<Product[]>('/api/products', params);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedGender) params.set('gender', selectedGender);
    if (priceRange.min) params.set('minPrice', priceRange.min);
    if (priceRange.max) params.set('maxPrice', priceRange.max);
    
    setSearchParams(params);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedGender('');
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-2">Products</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const params = new URLSearchParams(searchParams);
            if (searchTerm) params.set('search', searchTerm);
            else params.delete('search');
            setSearchParams(params);
          }} 
          className="relative w-full md:w-96 mb-4 md:mb-0"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="input pr-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500"
          >
            <Search size={18} />
          </button>
        </form>
        
        <div className="flex items-center">
          <button 
            onClick={toggleFilter}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-secondary-200">
          <form onSubmit={handleFilterSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium text-secondary-900 mb-3">Categories</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      className="mr-2"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                    />
                    <label htmlFor="category-all" className="text-secondary-700">All Categories</label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        className="mr-2"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="text-secondary-700">{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gender */}
              <div>
                <h3 className="font-medium text-secondary-900 mb-3">Gender</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender-all"
                      name="gender"
                      className="mr-2"
                      checked={selectedGender === ''}
                      onChange={() => setSelectedGender('')}
                    />
                    <label htmlFor="gender-all" className="text-secondary-700">All</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender-men"
                      name="gender"
                      className="mr-2"
                      checked={selectedGender === 'men'}
                      onChange={() => setSelectedGender('men')}
                    />
                    <label htmlFor="gender-men" className="text-secondary-700">Men</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender-women"
                      name="gender"
                      className="mr-2"
                      checked={selectedGender === 'women'}
                      onChange={() => setSelectedGender('women')}
                    />
                    <label htmlFor="gender-women" className="text-secondary-700">Women</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender-unisex"
                      name="gender"
                      className="mr-2"
                      checked={selectedGender === 'unisex'}
                      onChange={() => setSelectedGender('unisex')}
                    />
                    <label htmlFor="gender-unisex" className="text-secondary-700">Unisex</label>
                  </div>
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium text-secondary-900 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="min-price" className="text-sm text-secondary-600 mb-1 block">Min ($)</label>
                    <input
                      type="number"
                      id="min-price"
                      className="input w-full"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="max-price" className="text-sm text-secondary-600 mb-1 block">Max ($)</label>
                    <input
                      type="number"
                      id="max-price"
                      className="input w-full"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                type="button" 
                onClick={resetFilters}
                className="btn btn-secondary"
              >
                Reset Filters
              </button>
              
              <button type="submit" className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Active Filters */}
      {(searchParams.size > 0) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-secondary-600">Active Filters:</span>
          
          {searchParams.get('search') && (
            <span className="badge badge-secondary flex items-center gap-1">
              Search: {searchParams.get('search')}
              <button 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('search');
                  setSearchParams(params);
                  setSearchTerm('');
                }}
                className="ml-1"
              >
                ×
              </button>
            </span>
          )}
          
          {searchParams.get('category') && (
            <span className="badge badge-secondary flex items-center gap-1">
              Category: {searchParams.get('category')}
              <button 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('category');
                  setSearchParams(params);
                  setSelectedCategory('');
                }}
                className="ml-1"
              >
                ×
              </button>
            </span>
          )}
          
          {searchParams.get('gender') && (
            <span className="badge badge-secondary flex items-center gap-1">
              Gender: {searchParams.get('gender')}
              <button 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('gender');
                  setSearchParams(params);
                  setSelectedGender('');
                }}
                className="ml-1"
              >
                ×
              </button>
            </span>
          )}
          
          {(searchParams.get('minPrice') || searchParams.get('maxPrice')) && (
            <span className="badge badge-secondary flex items-center gap-1">
              Price: {searchParams.get('minPrice') || '0'} - {searchParams.get('maxPrice') || '∞'}
              <button 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('minPrice');
                  params.delete('maxPrice');
                  setSearchParams(params);
                  setPriceRange({ min: '', max: '' });
                }}
                className="ml-1"
              >
                ×
              </button>
            </span>
          )}
          
          <button 
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear All
          </button>
        </div>
      )}
      
      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
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
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-secondary-600 mb-2">No products found</h2>
          <p className="text-secondary-500">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;