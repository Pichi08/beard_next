"use client";

import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import Link from "next/link";
import { useState } from 'react';
import { useCart } from "@/hooks/cart/useInfoCart";
import { useShipping } from "@/hooks/shipping/useShipping"
import { useDeleteCartItems } from "@/hooks/cart/useDeleteCarItems"
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const { cartData } = useCart();
  const router = useRouter();
  const { shippingInfo: shippingFunction } = useShipping();
  const { deleteCartItems: deleteCartItemsFunction } = useDeleteCartItems();

  // Form State
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [apto, setApto] = useState("");
  const [city, setCity] = useState("");

  // Calculate cart subtotal dynamically from cart items
  const cartSubtotal = cartData?.cart?.items.reduce((sum, item) => sum + parseFloat(item.total), 0) || 0;
  const tax = cartSubtotal * 0.19; // Example tax rate of 19%
  const shipping = 0;
  const total = cartSubtotal + tax + shipping;

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (!id || !address || !city || !cardNumber || !expiryDate || !cvv) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    const newAddress = address + ", " + city + ", " + apto

    shippingFunction(newAddress, newAddress, total)
      .then((res) => {
        
        alert("Orden completada y en revisión");
        deleteCartItemsFunction(cartData?.cart?.id);
        console.log(res)
        router.push("/user");
      })
      .catch((err) => {
        console.log(err)
      })
    
    
  };

  return (
    <div className="flex flex-col bg-white w-full">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Billing Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-black font-semibold mb-6">Detalles de Facturación</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Número de Identificación*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Número de Identificación"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ color: id ? 'black' : 'gray' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Dirección*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ color: address ? 'black' : 'gray' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Apartamento, piso, etc. (opcional)</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Apartamento, piso, etc. (opcional)"
                    value={apto}
                    onChange={(e) => setApto(e.target.value)}
                    style={{ color: apto ? 'black' : 'gray' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Municipio/Ciudad*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Municipio/Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ color: city ? 'black' : 'gray' }}
                  />
                </div>
              </form>
            </div>
            <Link href="/cart">
              <button className="mt-4 text-gray-800 px-4 py-2 border rounded-md self-start">Volver al carrito</button>
            </Link>
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
                <span>Impuestos 19%:</span>
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
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Número de Tarjeta de Crédito</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ color: cardNumber ? 'black' : 'gray' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700">Fecha de Expiración</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        style={{ color: expiryDate ? 'black' : 'gray' }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">CVV</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        style={{ color: cvv ? 'black' : 'gray' }}
                      />
                    </div>
                  </div>
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
              <button
                className="w-full mt-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                onClick={handlePlaceOrder}
              >
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
