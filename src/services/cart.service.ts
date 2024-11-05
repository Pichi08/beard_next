import axios, {AxiosInstance}  from 'axios';

export class CartService {
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

    public async getCart(token: string, email: string | undefined) {
        const response = await this.axios.get(`/users/cart/email/${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                    //Authorization: token
        }
            });
        return response.data;
    }
}