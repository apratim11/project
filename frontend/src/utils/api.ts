import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh here if needed
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Handle logout or token refresh
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params = {}) => {
    return instance.get<T, T>(url, { params });
  },
  post: <T>(url: string, data = {}) => {
    return instance.post<T, T>(url, data);
  },
  put: <T>(url: string, data = {}) => {
    return instance.put<T, T>(url, data);
  },
  delete: <T>(url: string) => {
    return instance.delete<T, T>(url);
  },
  setAuthToken: (token: string | null) => {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
  },
};