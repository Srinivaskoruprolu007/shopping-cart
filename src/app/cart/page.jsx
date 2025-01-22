"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import useCartStore from "@/lib/store/cartStore";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.success("Product removed from cart");
  };

  const handleUpdateQuantity = (id, type) => {
    const item = cartItems.find((item) => item.id === id);
    if (type === "dec" && item.quantity === 1) {
      removeFromCart(id);
      return;
    }

    updateQuantity(id, type);
    toast.success(
      type === "inc"
        ? "Product quantity increased"
        : "Product quantity decreased"
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border rounded-lg p-4 shadow-md"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "dec")}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "inc")}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-gray-600 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
