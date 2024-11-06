import { Shopping } from '@/interfaces/shipping';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { ShippingService } from '@/services/shipping.service';

export const useShipping = () => {
    const { user: currentUser } = useCurrentUser();
    const shippingInfo = async (shipping_address: string, order_address: string, amount: number) => {
        if (currentUser?.token && currentUser?.email) {
            const shippingService = new ShippingService("https://beard-nest.vercel.app/");
            try {
                const shopping = await shippingService.addShipping(currentUser.token, shipping_address, order_address, amount, currentUser.email);
                return shopping as Shopping
            } catch (err) {
                console.log("Error fetching something: ", err);
            }
        } else {
            console.warn("No token or email found in CurrentUser.");
        }
    }

    return { shippingInfo };
}
  
