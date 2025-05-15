import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Modern Threads
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-secondary-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-secondary-700 hover:text-primary-600 font-medium">
              All Products
            </Link>
            <Link to="/products?gender=men" className="text-secondary-700 hover:text-primary-600 font-medium">
              Men
            </Link>
            <Link to="/products?gender=women" className="text-secondary-700 hover:text-primary-600 font-medium">
              Women
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="input w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500"
              >
                <Search size={18} />
              </button>
            </form>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-secondary-700 hover:text-primary-600">
                    <User size={20} />
                    <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/signin" className="flex items-center space-x-1 text-secondary-700 hover:text-primary-600">
                  <User size={20} />
                  <span className="font-medium">Sign In</span>
                </Link>
              )}

              <Link to="/cart" className="relative flex items-center text-secondary-700 hover:text-primary-600">
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative flex items-center text-secondary-700">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMobileMenu} className="text-secondary-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-secondary-100 py-4">
          <div className="container-custom space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="input w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500"
              >
                <Search size={18} />
              </button>
            </form>

            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary-700 hover:text-primary-600 font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary-700 hover:text-primary-600 font-medium"
              >
                All Products
              </Link>
              <Link
                to="/products?gender=men"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary-700 hover:text-primary-600 font-medium"
              >
                Men
              </Link>
              <Link
                to="/products?gender=women"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary-700 hover:text-primary-600 font-medium"
              >
                Women
              </Link>
            </nav>

            <div className="pt-3 border-t border-secondary-100">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-secondary-700 hover:text-primary-600 font-medium"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-secondary-700 hover:text-primary-600 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-secondary-700 hover:text-primary-600 font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;