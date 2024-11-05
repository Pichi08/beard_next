"use client"

import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className=" flex flex-col bg-white w-full">
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <img src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1730695166/Group_1000005936_qruihs.png" alt="Funda para Cojín" className="w-12 h-12" />
              <span className="text-gray-800">Funda para Cojín</span>
              <span className="text-gray-800 ">$203.000</span>
            </div>
            <div className="flex justify-between items-center ">
              <img src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1730695166/Group_1000005936_qruihs.png" alt="Contenedor en Cumare" className="w-12 h-12" />
              <span className="text-gray-800">Contenedor en Cumare</span>
              <span className="text-gray-800 ">$192.000</span>
            </div>
            <hr className="my-4" />
            <div className="text-black flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">$395.000</span>
            </div>
            <div className=" text-black flex justify-between">
              <span>Impuestos:</span>
              <span className="">$75.050</span>
            </div>
            <div className="text-black flex justify-between">
              <span>Envío:</span>
              <span className="">$0</span>
            </div>
            <div className="text-black flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>$470.050</span>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-gray-700 mb-2">Método de Pago</h3>
              <div className="flex items-center space-x-2">
                <input type="radio" name="payment" id="wompi" className="form-radio" />
                <label htmlFor="wompi" className="text-gray-700">Wompi</label>
              </div>
              <div className="flex items-center mt-4 space-x-2">
                <img src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1730695166/Group_1000005936_qruihs.png" alt="Visa" className="w-8 h-8" />
                <img src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1730695166/Group_1000005936_qruihs.png" alt="Mastercard" className="w-8 h-8" />
                <img src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1730695166/Group_1000005936_qruihs.png" alt="Amex" className="w-8 h-8" />
              </div>
            </div>

            {/* Coupon and Place Order */}
            <div className="mt-6 flex space-x-2">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                Apply Coupon
              </button>
            </div>
            <button className="w-full mt-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
