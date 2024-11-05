export interface Product {
    id: string;
    name: string;
    price: string; // You may use `number` if you parse the price as a number
    main_url_image: string
}

export interface CartItem {
    id: string;
    quantity: number;
    total: string; // Use `number` if needed
    product: Product;
}

export interface Cart {
    id: string;
    items: CartItem[];
}

export interface User {
    id: string;
    email: string;
    cart: Cart | null; // Make it nullable in case a user has no cart
}
