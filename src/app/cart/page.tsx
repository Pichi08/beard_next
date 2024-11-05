"use client"

import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import Link from "next/link";
import { useState } from 'react';

export default function Cart() {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(2);

  const subtotal1 = 203000 * quantity1;
  const subtotal2 = 96000 * quantity2;
  const cartSubtotal = subtotal1 + subtotal2;
  const shipping = 0;
  const total = cartSubtotal + shipping;

  return (
    <div className=" flex flex-col bg-white w-full">
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

          <div className=" text-gray-800 px-6 py-4 border-b grid grid-cols-4 items-center">
            <div className="flex items-center space-x-4">
              <img src="/path/to/image1.jpg" alt="Funda para cojín" className="w-16 h-16" />
              <span>Funda para cojín</span>
            </div>
            <span>$203.000</span>
            <select
              value={quantity1}
              onChange={(e) => setQuantity1(Number(e.target.value))} // Convert to number
              className="border rounded p-2 w-16 text-center"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>${subtotal1.toLocaleString('es-CO')}</span>
          </div>

          <div className="text-gray-800 px-6 py-4 border-b grid grid-cols-4 items-center">
            <div className="flex items-center space-x-4">
              <img src="/path/to/image2.jpg" alt="Contenedor en Cumare" className="w-16 h-16" />
              <span>Contenedor en Cumare</span>
            </div>
            <span>$96.000</span>
            <select
              value={quantity2}
              onChange={(e) => setQuantity2(Number(e.target.value))} // Convert to number
              className="border rounded p-2 p-2 w-16 text-center"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>${subtotal2.toLocaleString('es-CO')}</span>
          </div>
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
