import axios, {AxiosInstance}  from 'axios';

export class ImagesService {
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

    public async getAllImagesOfProduct(id: string) {
        const response = await this.axios.get(`/images/${id}`,
            {
                
            });
        return response.data;
    }
}