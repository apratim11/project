import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';

// Define validation schema
const shippingSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

type ShippingForm = z.infer<typeof shippingSchema>;

const CheckoutPage: React.FC = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const handlePlaceOrder = async (shippingData: ShippingForm) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Transform items for the order
      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product.price,
      }));
      
      const orderData = {
        items: orderItems,
        shippingAddress: shippingData,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: 0, // This would normally be calculated
        totalPrice: total,
      };
      
      await api.post('/api/orders', orderData);
      
      // Clear cart and show success
      clearCart();
      setIsOrderPlaced(true);
      
      // Auto-redirect after a few seconds
      setTimeout(() => {
        navigate('/profile');
      }, 5000);
      
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-24 h-24 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-secondary-600 mb-8">
            Thank you for your order, {user?.name}. We've received your order and are processing it now.
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-primary"
          >
            View Your Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping & Payment Forms */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handlePlaceOrder)}>
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck size={20} className="text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className={`input w-full ${errors.fullName ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('fullName')}
                    defaultValue={user?.name || ''}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-error-600">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={`input w-full ${errors.address ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-error-600">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className={`input w-full ${errors.city ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('city')}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-error-600">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-secondary-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    className={`input w-full ${errors.postalCode ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('postalCode')}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-error-600">{errors.postalCode.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className={`input w-full ${errors.country ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('country')}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-error-600">{errors.country.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CreditCard size={20} className="text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-method"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                  />
                  <label htmlFor="credit-card" className="ml-3 block text-secondary-700">
                    Credit Card
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment-method"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-secondary-700">
                    PayPal
                  </label>
                </div>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="mt-4 p-4 bg-secondary-50 rounded-md">
                  <p className="text-sm text-secondary-600 mb-2">
                    This is a demo application. No actual payment will be processed.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="card-number" className="block text-sm font-medium text-secondary-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        className="input w-full"
                        placeholder="1234 5678 9012 3456"
                        disabled
                      />
                    </div>

                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-secondary-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        className="input w-full"
                        placeholder="MM/YY"
                        disabled
                      />
                    </div>

                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-secondary-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        className="input w-full"
                        placeholder="123"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center mt-6">
                <Shield size={16} className="text-secondary-500 mr-2" />
                <p className="text-sm text-secondary-600">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-6 py-3"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="max-h-80 overflow-y-auto mb-4">
              {items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}-${item.color}`}
                  className="flex py-3 border-b border-secondary-100 last:border-0"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary-50 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-xs text-secondary-500 mt-1">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-secondary-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-secondary-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-secondary-200 pt-2 mt-2"></div>
              <div className="flex justify-between font-bold text-secondary-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;