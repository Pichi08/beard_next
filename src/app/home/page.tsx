"use client"

import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import ProductPreview from '@/components/product-preview/ProductPreview';
import { CategoryCard } from "@/components/categories-section/CategoriesSection";
import { useCategories } from "@/hooks/categories/useCategories";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductsService } from "@/services/products.service";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Cantidad de productos por página
  const { categories } = useCategories();
  const router = useRouter();

  const productService = new ProductsService("https://beard-nest.vercel.app/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.getAllProducts(currentPage, pageSize);
        setProducts(response.data); 
        console.log("Products fetched:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const onSubmit = async () => {
    router.push("/products");
  };

  return (
    <div className="flex flex-col bg-white w-full">
      {/* Navegación */}
      <Navbar />

      {/* Banner principal */}
      <section className="w-full h-[400px] relative">
        <img
          src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1716350980/samples/coffee.jpg"
          alt="Beard Care Products"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Sección de productos destacados */}
      <section className="w-[90%] max-w-[1200px] mx-auto my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <ProductPreview key={index} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button 
          onClick={onSubmit}
          className="px-6 py-3 my-4 bg-green-600 text-white rounded hover:bg-green-500">
            Ver todos los productos
          </button>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-1 bg-gray-300 my-4 mx-auto w-[90%] max-w-[1200px]" />

      {/* Sección de categorías */}
      <section className="w-[90%] max-w-[1200px] mx-auto my-10 mb-40">
        <div className="flex items-center mb-2">
          <div className="w-4 h-9 bg-green-600 rounded mr-4"></div>
          <h2 className="text-2xl font-bold text-green-600">Categorías</h2>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Buscar por categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} name={category.name} image={category.url_image} />
          ))}
        </div>
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
