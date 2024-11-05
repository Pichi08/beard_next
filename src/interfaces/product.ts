import { Category } from "./category";
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
    // reviewCount: number;
  }
  