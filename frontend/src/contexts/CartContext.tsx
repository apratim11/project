import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartState, CartItem, Product } from '../types';

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'INITIALIZE_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.product._id === action.payload.product._id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      let updatedItems;
      
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      const { subtotal, shipping, total } = calculateCartTotals(updatedItems);
      
      return {
        items: updatedItems,
        subtotal,
        shipping,
        total,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(
        (item) => item.product._id !== action.payload
      );
      
      const { subtotal, shipping, total } = calculateCartTotals(updatedItems);
      
      return {
        items: updatedItems,
        subtotal,
        shipping,
        total,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map((item) =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const { subtotal, shipping, total } = calculateCartTotals(updatedItems);
      
      return {
        items: updatedItems,
        subtotal,
        shipping,
        total,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    case 'INITIALIZE_CART': {
      const { subtotal, shipping, total } = calculateCartTotals(action.payload);
      
      return {
        items: action.payload,
        subtotal,
        shipping,
        total,
      };
    }
    
    default:
      return state;
  }
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'INITIALIZE_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, size, color },
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};