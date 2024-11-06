"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from "@/components/footer/Footer";
import ProductPreview from "@/components/product-preview/ProductPreview";
import { ProductsService } from "@/services/products.service";
import { useCategories } from "@/hooks/categories/useCategories";
import { Product } from "@/interfaces/product";
import { Pagination } from '@mui/material'; // Importa Pagination de Material-UI

export default function Products() {
  const { categories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
  const [totalProducts, setTotalProducts] = useState<number>(0); // Estado para el total de productos
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(3);

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

  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  /*
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategories.length
      ? selectedCategories.includes(product.category.id)
      : true;
    const matchPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return matchCategory && matchPrice;
  });
  */

  const totalPages = Math.ceil(totalProducts / pageSize);

  /*
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };
  */

  /*
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = e.target.value.split("-");
    setPriceRange({
      min: Number(selectedRange[0]),
      max: Number(selectedRange[1]),
    });
  };
  */

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col bg-white w-full">
      <Navbar />
      <div className="flex w-[90%] max-w-[1200px] mx-auto my-8">
        <aside className="w-1/4 mr-20 ml-0">
          <h2 className="text-xl font-bold text-black mb-4">Filtrar</h2>

          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <h3 className="text-gray-600 font-semibold border-b border-gray-300 pb-2">
              Por Precio
            </h3>
            <div className="flex flex-col">
              <label
                htmlFor="price-range"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Selecciona un rango de precio
              </label>
              <select
                id="price-range"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5"
              >
                <option value="0-1000">Hasta $1000</option>
                <option value="1000-5000">$1000 - $5000</option>
                <option value="5000-10000">$5000 - $10000</option>
                <option value="10000-20000">Más de $10000</option>
              </select>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <h3 className="text-gray-600 font-semibold mb-2 border-b border-gray-300 pb-2">
              Por Categoría
            </h3>
            <div className="flex flex-col">
              {categories.map((category) => (
                <div key={category.id} className="inline-flex items-center mb-2">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor={`category-${category.id}`}
                    data-ripple-dark="true"
                  >
                    <input
                      id={`category-${category.id}`}
                      type="checkbox"
                      value={category.id}
                      className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-slate-800 checked:before:bg-slate-400 hover:before:opacity-10"
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="cursor-pointer text-black text-sm ml-2"
                    htmlFor={`category-${category.id}`}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="w-3/4 mb-40">
          <div className="flex items-center mb-8">
            <div className="w-4 h-9 bg-green-600 rounded mr-4"></div>
            <h2 className="text-L font-bold text-green-600">Nuestros Productos</h2>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Explora nuestros productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductPreview key={index} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
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
