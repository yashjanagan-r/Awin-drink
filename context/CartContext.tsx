'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, FlavorId, PackSize } from '@/lib/types';
import { PRODUCTS, FREE_SHIPPING_THRESHOLD, SUBSCRIPTION_DISCOUNT } from '@/lib/products';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (flavorId: FlavorId, packSize: PackSize, isSubscription: boolean, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItemsCount: number;
  freeShippingProgress: number;
  amountUntilFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aavin_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
    setHasLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (hasLoaded) {
      try {
        localStorage.setItem('aavin_cart', JSON.stringify(items));
      } catch {
        // Ignore
      }
    }
  }, [items, hasLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (
    flavorId: FlavorId,
    packSize: PackSize,
    isSubscription: boolean,
    quantity = 1
  ) => {
    const product = PRODUCTS.find((p) => p.id === flavorId);
    if (!product) return;

    let basePrice = product.prices[packSize] || product.prices['12-pack'];
    if (isSubscription) {
      basePrice = Math.round(basePrice * (1 - SUBSCRIPTION_DISCOUNT));
    }

    const itemKey = `${flavorId}-${packSize}-${isSubscription ? 'sub' : 'one'}`;

    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const next = [...currentItems];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [
        ...currentItems,
        {
          id: itemKey,
          flavorId,
          name: product.name,
          image: product.image,
          packSize,
          isSubscription,
          unitPrice: basePrice,
          quantity,
        },
      ];
    });

    setIsOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItemsCount,
        freeShippingProgress,
        amountUntilFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
