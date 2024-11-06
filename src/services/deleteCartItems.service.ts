import axios, {AxiosInstance}  from 'axios';

export class DeleteCartItemsService {
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

    public async deleteCartItems(token: string, id_cart: string | undefined) {
        const response = await this.axios.delete(`/carts/${id_cart}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    }
}