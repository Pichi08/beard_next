import { Category } from "./category";
export interface Product {
    id: string;
    name: string;
    price: number;
    main_url_image: string;
    rating: number;
    category: Category;
    // reviewCount: number;
  }
  