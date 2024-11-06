import { Product } from '@/interfaces/product';
import axios, {AxiosInstance}  from 'axios';

interface UpdateProductInput{
    name: string;
    description: string;
    price: number;
    stock: number;
}

export class ProductsService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 6000, 
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async getAllProducts(page: number =1,limit: number = 3) {
        const response = await this.axios.get(`/products?page=${page}&limit=${limit}`,
            {

            });
        return response.data;
    }

    public async getProductBySlug(slug: string) {
        const response = await this.axios.get(`/products/${slug}`,
            {
                
            });
        return response.data;
    }

    public async getProductById(id: string) {
        const response = await this.axios.get(`/products/id/${id}`,
            {

            });
        return response.data;
    }

    public async deleteProduct(token: string, slug: string) {
        const response = await this.axios.delete(`/products/slug/${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            });
        return response.status;
    }



    public async updateProduct(slug: string, product: UpdateProductInput, token: string) {
        // Convertir `price` y `stock` a número si aún son strings
        const parsedProduct = {
            ...product,
            price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
            stock: typeof product.stock === "string" ? parseInt(product.stock, 10) : product.stock,
        };
    
        console.log('updateProduct', parsedProduct);
    
        const response = await this.axios.patch(`/products/${slug}`, parsedProduct, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        return response.data;
    }
    
    
}