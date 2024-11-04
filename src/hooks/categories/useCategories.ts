import { useState, useEffect } from "react";
import { CategoriesService } from "@/services/categories.service";
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { Category } from "@/interfaces/category";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { user: currentUser } = useCurrentUser();
    
    useEffect(() => {
        const fetchCategories = async () => {
            if (currentUser?.token) {
                const categoryService = new CategoriesService("https://beard-nest.vercel.app/");
                try {
                    const categorieList = await categoryService.getAllCategories(currentUser.token);
                    setCategories(categorieList);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            } else {
                console.warn("No token found in CurrentUser.");
            }
        };
        
        fetchCategories();
    }, [currentUser]);

    return { categories };
};
