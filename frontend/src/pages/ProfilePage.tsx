import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Package, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';
import { Order } from '../types';

// Define validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => !data.password || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ProfileForm = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    });
  }, [user, reset]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoadingOrders(true);
        const data = await api.get<Order[]>('/api/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      setIsLoading(true);
      
      // Only include password if provided
      const updateData = {
        name: data.name,
        email: data.email,
        ...(data.password ? { password: data.password } : {}),
      };
      
      await api.put('/api/users/me', updateData);
      
      toast.success('Profile updated successfully');
      reset({
        ...data,
        password: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-secondary-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon size={24} className="text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-secondary-900">{user?.name}</h3>
                  <p className="text-sm text-secondary-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left p-3 rounded-md flex items-center ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                <UserIcon size={18} className="mr-3" />
                Profile Information
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left p-3 rounded-md flex items-center ${
                  activeTab === 'orders'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                <Package size={18} className="mr-3" />
                Order History
              </button>
            </div>
            
            <div className="p-4 border-t border-secondary-100">
              <button
                onClick={handleLogout}
                className="w-full text-center py-2 text-secondary-700 hover:text-secondary-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`input w-full ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`input w-full ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                    New Password (optional)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className={`input w-full pr-10 ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`input w-full ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-secondary-100">
                <h2 className="text-xl font-bold">Order History</h2>
              </div>

              {isLoadingOrders ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-4 text-secondary-600">Loading your orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-secondary-200">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-secondary-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                            #{order._id.substring(0, 8).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.isPaid ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-50 text-success-700">
                                Paid
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-50 text-warning-700">
                                Unpaid
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Package size={48} className="text-secondary-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-900 mb-1">No Orders Yet</h3>
                  <p className="text-secondary-600 mb-4">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="btn btn-primary"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;