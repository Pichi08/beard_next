import { useState, useEffect } from 'react';
import { User } from '@/interfaces/profileOrder';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { ProfileOrderService } from "@/services/profileOrder.service";

export const useProfileOrder = () => {
    const { user: currentUser } = useCurrentUser();
    const [profileOrderData, setProfileOrderData] = useState<User | null>(null);

    useEffect(() => {
        const fetchProfileOrder = async () => {
            if (currentUser?.token && currentUser?.email) {
                const profileOrderService = new ProfileOrderService("https://beard-nest.vercel.app/");
                try {
                    const order = await profileOrderService.getProfileOrder(currentUser.token, currentUser.email);
                    setProfileOrderData(order);
                } catch (err) {
                    console.log("Error fetching profile and orders: ", err);
                }
            } else {
                console.warn("No token or email found in CurrentUser.");
            }
        };

        fetchProfileOrder();
    }, [currentUser]); // Dependency array includes currentUser to refetch on changes

    return { profileOrderData };
};
