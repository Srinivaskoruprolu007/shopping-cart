"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCartStore from "@/lib/store/cartStore";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.cartItems);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="text-xl font-bold">
            Shop
          </Link>
          <Link
            href={"/cart"}
            className={`relative p-2 ${
              pathname === "/cart" ? "text-blue-500" : ""
            }`}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 w-5 h-5 text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;