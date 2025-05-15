import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { items, subtotal, shipping, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    if (quantity > 10) {
      quantity = 10;
    }
    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/signin', { state: { from: '/checkout' } });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-lg mx-auto">
          <ShoppingBag size={64} className="mx-auto text-secondary-300" />
          <h1 className="text-3xl font-bold mt-4 mb-2">Your Cart is Empty</h1>
          <p className="text-secondary-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-4 border-b border-secondary-200 text-sm font-medium text-secondary-600">
              <div className="sm:col-span-6">Product</div>
              <div className="sm:col-span-2 text-center">Price</div>
              <div className="sm:col-span-2 text-center">Quantity</div>
              <div className="sm:col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div
                key={`${item.product._id}-${item.size}-${item.color}`}
                className="grid sm:grid-cols-12 gap-4 p-4 border-b border-secondary-200 items-center"
              >
                <div className="sm:col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary-50">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <Link 
                      to={`/products/${item.product._id}`}
                      className="font-medium text-secondary-900 hover:text-primary-600"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-secondary-600 mt-1">
                      <span>Size: {item.size}</span>
                      <span className="mx-2">|</span>
                      <span>Color: {item.color}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="flex items-center text-secondary-500 hover:text-error-600 text-sm mt-2 sm:hidden"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2 text-center">
                  <div className="sm:hidden text-sm text-secondary-600 mb-1">Price:</div>
                  ${item.product.price.toFixed(2)}
                </div>

                <div className="sm:col-span-2 text-center">
                  <div className="sm:hidden text-sm text-secondary-600 mb-1">Quantity:</div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 border border-secondary-300 rounded-l-md flex items-center justify-center text-secondary-600 hover:bg-secondary-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => 
                        handleQuantityChange(item.product._id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 h-8 border-y border-secondary-300 text-center focus:outline-none"
                      min="1"
                      max="10"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 border border-secondary-300 rounded-r-md flex items-center justify-center text-secondary-600 hover:bg-secondary-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2 text-right">
                  <div className="sm:hidden text-sm text-secondary-600 mb-1">Total:</div>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="hidden sm:inline-flex items-center text-secondary-500 hover:text-error-600 text-sm ml-4"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4 flex justify-between">
              <Link to="/products" className="text-primary-600 hover:text-primary-700 flex items-center">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Continue Shopping
              </Link>

              <button 
                onClick={() => clearCart()} 
                className="text-secondary-600 hover:text-secondary-900"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-secondary-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  {subtotal > 100 && <span className="block text-xs text-success-700">(Free over $100)</span>}
                </span>
              </div>
              <div className="border-t border-secondary-200 pt-2 mt-2"></div>
              <div className="flex justify-between font-bold text-secondary-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-full mt-6 py-3"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-xs text-secondary-500 text-center">
                <p>Taxes calculated at checkout</p>
                <p className="mt-1">Free shipping on orders over $100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;