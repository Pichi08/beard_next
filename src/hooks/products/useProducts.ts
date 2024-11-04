import { useState, useEffect } from "react";
import { Product } from "@/interfaces/product";
import { ProductsService } from "@/services/products.service";
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { user: currentUser } = useCurrentUser();
    
    useEffect(() => {
        const fetchProducts = async () => {
            if (currentUser?.token) {
                const productService = new ProductsService("https://beard-nest.vercel.app/");
                try {
                    const productList = await productService.getAllProducts(currentUser.token);
                    setProducts(productList);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            } else {
                console.warn("No token found in CurrentUser.");
            }
        };
        
        fetchProducts();
    }, [currentUser]);

    return { products };
};
