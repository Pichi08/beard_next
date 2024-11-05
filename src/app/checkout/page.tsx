"use client";

import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import Link from "next/link";
import { useCart } from "@/hooks/cart/useInfoCart";

export default function CheckoutPage() {
  const { cartData } = useCart();
  console.log("Checkout Items", cartData);

  // Calculate cart subtotal dynamically from cart items
  const cartSubtotal = cartData?.cart?.items.reduce((sum, item) => sum + parseFloat(item.total), 0) || 0;
  const tax = cartSubtotal * 0.19; // Example tax rate of 19%
  const shipping = 0;
  const total = cartSubtotal + tax + shipping;

  return (
    <div className="flex flex-col bg-white w-full">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl text-black font-semibold mb-6">Detalles de Facturación</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Número de Identificación*</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Número de Identificación"
                />
              </div>
              <div>
                <label className="block text-gray-700">Dirección*</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Dirección"
                />
              </div>
              <div>
                <label className="block text-gray-700">Apartamento, piso, etc. (opcional)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Apartamento, piso, etc. (opcional)"
                />
              </div>
              <div>
                <label className="block text-gray-700">Municipio/Ciudad*</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Municipio/Ciudad"
                />
              </div>
              <Link href="/cart">
                <button className="mt-40 text-gray-800 px-4 py-2 border rounded-md">Volver al carrito</button>
              </Link>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl text-black font-semibold mb-4">Resumen del Pedido</h2>
            <div className="space-y-4">
              {cartData?.cart?.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <img src={item.product.main_url_image} alt={item.product.name} className="w-12 h-12" />
                  <span className="text-gray-800">{item.product.name}</span>
                  <span className="text-gray-800 ">${parseFloat(item.total).toLocaleString('es-CO')}</span>
                </div>
              ))}

              <hr className="my-4" />
              <div className="text-black flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${cartSubtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="text-black flex justify-between">
                <span>Impuestos:</span>
                <span>${tax.toLocaleString('es-CO')}</span>
              </div>
              <div className="text-black flex justify-between">
                <span>Envío:</span>
                <span>${shipping.toLocaleString('es-CO')}</span>
              </div>
              <div className="text-black flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toLocaleString('es-CO')}</span>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="text-gray-700 mb-2">Método de Pago</h3>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="payment" id="wompi" className="form-radio" />
                  <label htmlFor="wompi" className="text-gray-700">Wompi</label>
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <img src="/path/to/visa-image.jpg" alt="Visa" className="w-8 h-8" />
                  <img src="/path/to/mastercard-image.jpg" alt="Mastercard" className="w-8 h-8" />
                  <img src="/path/to/amex-image.jpg" alt="Amex" className="w-8 h-8" />
                </div>
              </div>

              {/* Coupon and Place Order */}
              <div className="mt-6 flex space-x-2">
                <input
                  type="text"
                  placeholder="Código de Cupón"
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                  Aplicar Cupón
                </button>
              </div>
              <button className="w-full mt-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                Realizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
