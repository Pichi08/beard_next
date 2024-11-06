"use client";

import { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/userCurrentUser";
import { Providers } from "@/store/Providers";
import { CartCounter } from "../cart/CartCounter";
import { useCart } from "@/hooks/cart/useInfoCart";


const navItems = [
  { name: "Inicio", path: "/home" },
  { name: "Productos", path: "/products" },
  { name: "Blogs", path: "/blogs" },
];

export const Navbar = () => {
  const { logout } = useLogout();
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
  const { cartData } = useCart();

  // Set cartSubtotal to null initially to differentiate the loading state
  const [cartSubtotal, setCartSubtotal] = useState(null);

  const isLogged = currentUser != null;

  useEffect(() => {
    if (cartData?.cart?.items) {
      const total = cartData.cart.items.reduce((sum, item) => sum + parseFloat(item.quantity), 0);
      console.log("total:", total); // Debugging to check total
      setCartSubtotal(total);
    }
  }, [cartData]);

  console.log("Total cart items:", cartSubtotal); // For debugging purposes

  return (
    <header className="top-0 shadow-md flex items-center justify-between px-1 py-2 z-30 bg-white">
      {/* Logo */}
      <h1 className="text-xl font-bold text-green-600 ml-10">
        <Link href="/home">Beard</Link>
      </h1>

      {/* Navigation Menu */}
      <nav className="flex items-center space-x-1">
        {navItems.map((item) => (
          <ActiveLink key={item.path} {...item} />
        ))}
      </nav>

      {/* User and Cart Icons */}
      <div className="flex items-center space-x-1 mr-10">
        <Providers>
          {/* Cart Icon with Counter */}
          <div className="relative">
            <Link href="/cart">
              <IoCartOutline className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
              {/* Counter Badge */}
              {cartSubtotal !== null && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">
                  <CartCounter value={cartSubtotal} />
                </span>
              )}
            </Link>
          </div>
        </Providers>

        {/* User Icon */}
        <Link href="/user">
          <GoPerson className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
        </Link>

        {/* Logout Icon */}
        {isLogged && (
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            <CiLogout className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" strokeWidth="0.5" />
          </button>
        )}
      </div>
    </header>
  );
};
