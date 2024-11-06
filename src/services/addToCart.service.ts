import axios, {AxiosInstance}  from 'axios';

export class AddToCartItems {
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

    public async addCartItems(token: string, total: number, quantity: number, productId: string, cartId: string) {
        const response = await this.axios.post(`/cart-items/`, {
                total,
                quantity,
                productId,
                cartId
            },
            { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    }
}