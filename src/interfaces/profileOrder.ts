export interface User {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    order: Order | null; // Make it nullable in case a user has no cart
}

export interface Order {
    id: string;
    amount: string;
    shipping_address: string;
    day: number;
    month: number;
    year: number;
    order_status: string
}