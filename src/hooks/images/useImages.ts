import { ImagesService } from "@/services/images.service";
import { Image } from "@/interfaces/image";

export const useImage = async (id: string): Promise<Image[]> => {
    const productService = new ImagesService("https://beard-nest.vercel.app/");
    try {
        const images = await productService.getAllImagesOfProduct(id);
        return images;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};
