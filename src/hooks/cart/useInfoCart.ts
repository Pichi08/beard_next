import { useState, useEffect } from 'react';
import { Cart } from '@/interfaces/cart';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { CartService } from "@/services/cart.service";

export const useCart = () => {
    const { user: currentUser } = useCurrentUser();
    const [cartData, setCartData] = useState<Cart | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (currentUser?.token && currentUser?.email) {
                const cartService = new CartService("https://beard-nest.vercel.app/");
                try {
                    const cart = await cartService.getCart(currentUser.token, currentUser.email);
                    setCartData(cart);
                } catch (err) {
                    console.log("Error fetching cart: ", err);
                }
            } else {
                console.warn("No token or email found in CurrentUser.");
            }
        };

        fetchCart();
    }, [currentUser]); // Dependency array includes currentUser to refetch on changes

    return { cartData };
};