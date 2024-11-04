import axios, {AxiosInstance}  from 'axios';

export class CategoriesService {
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

    public async getAllCategories(token: string) {
        const response = await this.axios.get('/categories',
            {
                headers: {
                    Authorization: `Bearer ${token}`
        }
            });
        return response.data;
    }
}