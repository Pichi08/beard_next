import { Category } from "./category";
import { Images } from "./images";
export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    main_url_image: string;
    rating: number;
    category: Category;
    images: Images[];
}
  