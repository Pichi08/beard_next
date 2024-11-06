"use client";

import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import Link from "next/link";
// import { useState } from 'react';
import { useCart } from "@/hooks/cart/useInfoCart";

export default function Cart() {
  const { cartData } = useCart();

  // Calculate cart subtotal dynamically from cart items
  const cartSubtotal = cartData?.cart?.items.reduce((sum, item) => sum + parseFloat(item.total), 0) || 0;
  const shipping = 0;
  const total = cartSubtotal + shipping;

  return (
    <div className="flex flex-col bg-white w-full">
      <Navbar />
      <div className="p-8 bg-white">
        <div className="mb-4 text-gray-600">
          Inicio / <span className="font-semibold">Carrito</span>
        </div>

        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="text-gray-800 grid grid-cols-4 font-semibold px-6 py-4 border-b">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
          </div>

          {cartData?.cart?.items.map((item) => (
            <div key={item.id} className="text-gray-800 px-6 py-4 border-b grid grid-cols-4 items-center">
              <div className="flex items-center space-x-4">
                {/* Replace this placeholder with actual product image if available */}
                <img src={item.product.main_url_image} alt={item.product.name} className="w-16 h-16" />
                <span>{item.product.name}</span>
              </div>
              <span>${parseFloat(item.product.price).toLocaleString('es-CO')}</span>
              <span>{item.quantity}</span>
              <span>${parseFloat(item.total).toLocaleString('es-CO')}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link href="/home">
            <button className="text-gray-800 px-4 py-2 border rounded-md">Volver a la tienda</button>
          </Link>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Código de Cupón"
              className="border rounded-md p-2"
            />
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
              Aplicar Cupón
            </button>
          </div>
        </div>

        <div className="text-gray-800 mt-6 border p-4 w-full md:w-1/3 mx-auto rounded-md">
          <div className="font-semibold text-lg mb-4">Total del Carrito</div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${cartSubtotal.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Envío:</span>
            <span>${shipping.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>Total:</span>
            <span>${total.toLocaleString('es-CO')}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
              Proceder al pago
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
