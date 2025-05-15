import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="card overflow-hidden transition-all duration-300 group-hover:shadow-md h-full flex flex-col">
        <div className="relative pb-[125%] overflow-hidden bg-secondary-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 badge badge-accent">Featured</span>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-secondary-900 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center text-accent-500">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-xs text-secondary-500 ml-2">({product.numReviews} reviews)</span>
          </div>
          <div className="mt-2 text-sm text-secondary-600 line-clamp-2 flex-grow">
            {product.description.substring(0, 70)}...
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-secondary-900">${product.price.toFixed(2)}</span>
            <div className="flex flex-wrap gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <span
                  key={index}
                  className="w-3 h-3 rounded-full border border-secondary-200"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></span>
              ))}
              {product.colors.length > 3 && (
                <span className="w-3 h-3 rounded-full bg-secondary-200 flex items-center justify-center text-[8px] leading-none">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;