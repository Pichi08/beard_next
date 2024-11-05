import { Product } from "@/interfaces/product";
import { ProductsService } from "@/services/products.service";

export const useProduct = () => {
    const fetchProductBySlug = async (slug: string): Promise<Product | null> => { 
        const productService = new ProductsService("https://beard-nest.vercel.app/");
        try {
            const product = await productService.getProductBySlug(slug);
            return product as Product;
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    };

    return { fetchProductBySlug };
};

