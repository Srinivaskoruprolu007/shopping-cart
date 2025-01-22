"use client";
import useCartStore from "@/lib/store/cartStore";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart");
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-xl font-semibold mt-2 truncate">{product.title}</h3>
      <p className="text-gray-600 mt-1">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-500 text-white rounded-md py-2 mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
