"use client";
import React, { useState, useEffect, useRef } from "react";
import { ProductsService } from "@/services/products.service";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product";
import { useCurrentUser } from "@/hooks/auth/userCurrentUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useCurrentUser();
  const hasFetchedProduct = useRef(false);
  const productService = new ProductsService("https://beard-nest.vercel.app/");

  // Fetch the product data by slug
  useEffect(() => {
    const fetchProduct = async () => {
      if (hasFetchedProduct.current) return;

      const response = await productService.getProductBySlug(slug);
      setProduct(response);
      setLoading(false);

      hasFetchedProduct.current = true;
    };
    fetchProduct();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({
        ...product,
        [name]: name === "price" ? parseFloat(value) : name === "stock" ? parseInt(value, 10) : value,
      });
    }
  };
  

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };

    if (currentUser) {
      const res = await productService.updateProduct(
        product.id,
        updatedProduct,
        currentUser.token
      );
      toast.success("Producto actualizado con éxito", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push(`/product/${product.slug}`);
    }, 1500);

    } else {
      console.error("User is not authenticated");
      toast.error("Error al actualizar producto", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mb-20 mt-6">
        <ToastContainer />
      <div className="flex items-center mb-6">
        <div className="w-4 h-9 bg-green-600 rounded mr-4"></div>
        <h2 className="text-2xl font-bold text-green-600">
          Actualizar Producto
        </h2>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Editar producto</h1>
      {product && (
        <form onSubmit={handleSubmit} className="flex gap-6">
          {/* Formulario con labels a la izquierda */}
          <div className="flex-1 space-y-4">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md text-sm text-gray-800"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="description"
              >
                Descripción
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md text-sm text-gray-800"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                type="float"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md text-sm text-gray-800"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md text-sm text-gray-800"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Guardar cambios
              </button>
            </div>
          </div>

          <div className="border-l-2 border-gray-300" />

          {/* Sección de imágenes y categoría */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Categoría</h2>
              <p className="text-sm text-gray-500">
                {product.category?.name || "Sin categoría"}
              </p>
            </div>

            <h2 className="text-lg font-semibold text-gray-700">Imágenes</h2>

            <div className="border p-4 rounded-md shadow-lg">
              <div className="mb-4">
                <div className="flex space-x-4">
                  <img
                    src={product.main_url_image}
                    alt="Imagen principal"
                    className="w-1/3 h-auto object-cover rounded-md" // Establecer tamaño consistente
                  />
                  <div className="grid grid-cols-3 gap-4 w-2/3">
                    {product.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image.url_img}
                        alt={`Imagen secundaria ${index + 1}`}
                        className="w-full h-auto object-cover rounded-md" // Establecer tamaño consistente
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
