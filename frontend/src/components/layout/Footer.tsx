import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Modern Threads</h3>
            <p className="text-secondary-300">
              Curated clothing collections that blend timeless elegance with modern style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?gender=men"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/products?gender=women"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Accessories"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/products?featured=true"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products?sale=true"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Help</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Track My Order
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Stay Updated</h4>
            <p className="text-secondary-300">
              Subscribe to our newsletter for exclusive offers and style updates.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input flex-grow rounded-r-none focus:z-10"
                />
                <button
                  type="submit"
                  className="btn btn-primary rounded-l-none px-3"
                >
                  <Mail size={18} />
                </button>
              </div>
              <p className="text-xs text-secondary-400">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-10 pt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-secondary-400 text-sm">
            &copy; {new Date().getFullYear()} Modern Threads. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm text-secondary-400">
            <a href="#" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;