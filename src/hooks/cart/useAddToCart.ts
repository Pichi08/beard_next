// import { Shopping } from '@/interfaces/shipping';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { AddToCartItems } from '@/services/addToCart.service';

export const useAddToCart = () => {
    const { user: currentUser } = useCurrentUser();
    const itemCart = async (total: number, quantity: number, productId: string, cartId: string) => {
        if (currentUser?.token) {
            const addToCartItems = new AddToCartItems("https://beard-nest.vercel.app/");
            try {
                const items = await addToCartItems.addCartItems(currentUser.token, total, quantity, productId, cartId);
                return items
            } catch (err) {
                console.log("Error fetching something: ", err);
            }
        } else {
            console.warn("No token or email found in CurrentUser.");
        }
    }

    return { itemCart };
}
  
