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

    public async addImages(token: string, productId: string, images: File[]) {
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image);
        });
        const response = await this.axios.post(`/images/${productId}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    }
}