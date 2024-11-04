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

    public async getAllProducts(token: string) {
        const response = await this.axios.get('/products',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                    //Authorization: token
        }
            });
        return response.data;
    }
}