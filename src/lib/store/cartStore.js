"use client";
import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, type) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: type === "inc" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      ),
    })),
}));

export default useCartStore;
