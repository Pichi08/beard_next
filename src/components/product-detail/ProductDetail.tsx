"use client";

import React, { useEffect, useState, useRef } from "react";
import { useProduct } from "@/hooks/products/useProduct";
import { useImage } from "@/hooks/images/useImages";
import { Product } from "@/interfaces/product";
import { Image } from "@/interfaces/image";
import Footer from "../footer/Footer";
import ProductPreview from "@/components/product-preview/ProductPreview";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ slug }) => {
  const { fetchProductBySlug } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<Image[]>([]);
  const [count, setCount] = useState(1);
  const hasFetchedProduct = useRef(false);

  useEffect(() => {
    const getProduct = async () => {
      if (hasFetchedProduct.current) return;

      try {
        const fetchedProduct = await fetchProductBySlug(slug);
        setProduct(fetchedProduct);

        if (fetchedProduct) {
          const images = await useImage(fetchedProduct.id);
          setSecondaryImages(images);
        }
        hasFetchedProduct.current = true;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [slug, fetchProductBySlug]);

  const handleCountChange = (value: number) => {
    setCount((prev) => Math.max(prev + value, 1));
  };

  if (!product) {
    return <div className="text-center py-10">Cargando...</div>; // Mensaje de carga
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      {/* Breadcrumb */}
      <div className="text-gray-700 mb-8 ">
        <a
          href="/home"
          className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-green-600"
        >
          Inicio
        </a>
        <span className="text-gray-500 mx-2">/</span>
        <a
          href="/products"
          className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-green-600"
        >
          Producto
        </a>
        <span className="text-gray-500 mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:pr-4">
          <img
            src={product.main_url_image}
            alt={product.name}
            className="w-full h-auto rounded shadow-md mb-4"
          />
          <div className="flex space-x-4 overflow-x-auto">
            {secondaryImages.map((image) => (
              <img
                key={image.id}
                src={image.url_img}
                alt={`Imagen secundaria ${image.id}`}
                className="w-32 h-auto rounded shadow-md cursor-pointer"
                onClick={() => console.log(`Mostrar imagen: ${image.url_img}`)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 md:pl-4 space-y-12">
          <h1 className="text-2xl font-bold mb-2 text-black ">{product.name}</h1>
          <p className="text-black text-xl font-semibold mb-4">{`$${product.price}`}</p>
          <p className="text-black text-gray-700 mb-4">{product.description}</p>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Contador y botón en una fila */}
          <div className="flex items-center mt-4">
            {/* Contenedor del contador */}
            <div className="flex items-center rounded-md p-2 space-x-1 mr-8">
              {/* Botón de menos */}
              <button
                className="bg-gray-300 text-black rounded p-2 hover:bg-gray-400 disabled:bg-gray-200 mr-3"
                onClick={() => handleCountChange(-1)}
                disabled={count === 1}
              >
                <RemoveIcon fontSize="small" />
              </button>

              {/* Input del contador */}
              <input
                type="number"
                min="1"
                value={count}
                readOnly
                className="w-16 text-center text-black focus:outline-none bg-transparent"
              />

              {/* Botón de más */}
              <button
                className="bg-green-600 text-white rounded p-2"
                onClick={() => handleCountChange(1)}
              >
                <AddIcon fontSize="small" />
              </button>
            </div>

            {/* Botón de añadir al carrito */}
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados */}
      <div className="mt-10">
        <div className="flex items-center mb-2">
          <div className="w-4 h-9 bg-green-600 rounded mr-4"></div>
          <h2 className="text-2xl font-bold text-green-600">
            Te puede interesar
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Aquí puedes agregar los productos relacionados */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
