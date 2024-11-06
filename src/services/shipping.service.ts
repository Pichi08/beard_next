import axios, {AxiosInstance}  from 'axios';

export class ShippingService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 6000, 
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async addShipping(token: string, shipping_address: string, order_address: string, amount: number, customer_email: string) {

        try {
            console.log("token: ", token)
            console.log("email", customer_email)
            const response = await this.axios.post('/orders', {
                shipping_address,
                order_address,
                amount,
                customer_email
            },
            { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error ni el mas hpta: ",error)
                // Extract and log the specific response text if available
                // console.log(error.response?.data?.message || "An error occurred");
                return error.response?.data?.message || "An error occurred";
            } else {
                // Handle non-Axios errors
                // console.log("An unexpected error occurred");
                return "An unexpected error occurred";
            }
        }
        
    }


}