import { useState, useEffect } from 'react';
// import { Cart } from '@/interfaces/cart';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { DeleteCartItemsService } from "@/services/deleteCartItems.service";

export const useDeleteCartItems = () => {
    const { user: currentUser } = useCurrentUser();
    const deleteCartItems = async (cart_id: string) => {

        if (currentUser?.token) {
            const cartService = new DeleteCartItemsService("https://beard-nest.vercel.app/");
            try {
                const cart = await cartService.deleteCartItems(currentUser.token, cart_id);
                return cart;
            } catch (err) {
                console.log("Error fetching cart: ", err);
            }
        } else {
            console.warn("No token or email found in CurrentUser.");
        }
    };


    return { deleteCartItems };
};