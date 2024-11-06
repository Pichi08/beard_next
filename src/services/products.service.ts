import axios, {AxiosInstance}  from 'axios';

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

    public async deleteProduct(token: string, slug: string) {
        const response = await this.axios.delete(`/products/slug/${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            });
        return response.status;
    }
}