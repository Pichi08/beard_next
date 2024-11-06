// useProducts.ts
import { useState } from "react";
import { Product } from "@/interfaces/product";
import { ProductsService } from "@/services/products.service";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
      const productService = new ProductsService("https://beard-nest.vercel.app/");
      try {
        const productList = await productService.getAllProducts(1, 5);
        console.log(' aaaa',productList.data);
        setProducts(productList.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  };

  return { products, fetchProducts };
};
