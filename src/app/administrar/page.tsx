"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from "@/components/footer/Footer";
import ProductPreview from "@/components/product-preview/ProductPreview";
import { ProductsService } from "@/services/products.service";
import { useCategories } from "@/hooks/categories/useCategories";
import { Product } from "@/interfaces/product";
import { Pagination } from '@mui/material';
import { useRouter } from "next/navigation";

export default function Products() {
  const { categories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
  const [totalProducts, setTotalProducts] = useState<number>(0); // Estado para el total de productos
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(3);
  const router = useRouter();

  const productService = new ProductsService("https://beard-nest.vercel.app/");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.getAllProducts(currentPage, pageSize);
        setProducts(response.data);
        setTotalProducts(response.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAddProduct = () => {
    router.push("/crearProducto");
  };

  return (
    <div className="flex flex-col bg-white w-full">
      <Navbar />
      <div className="flex w-[90%] max-w-[1200px] mx-auto my-8">
        <aside className="w-1/4 mr-20 ml-0">
          <h2 className="text-xl font-bold text-black mb-4">Acciones</h2>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
        </aside>

        <main className="w-3/4 mb-40">
          <div className="flex items-center mb-8">
            <div className="w-4 h-9 bg-green-600 rounded mr-4"></div>
            <h2 className="text-L font-bold text-green-600">Productos</h2>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Tus Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductPreview key={index} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(totalProducts / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
