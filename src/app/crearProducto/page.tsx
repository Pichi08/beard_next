"use client";
import { useState, FormEvent } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { CategoriesService } from "@/services/categories.service";
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { ProductsService } from "@/services/products.service";
import { ImagesService } from "@/services/images.service";

interface CreateProductInput {
    name: string;
    price: number | string;
    description: string;
    stock: number | string;
    categoryId: string;
}

const CreateProductPage = () => {
    const { categories } = useCategories();
    const { user: currentUser } = useCurrentUser();
    const [product, setProduct] = useState<CreateProductInput>({
        name: "",
        price: "",
        description: "",
        stock: "",
        categoryId: "",
    });
    const [additionalImages, setAdditionalImages] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                image: e.target.files ? e.target.files[0] : null,
            }));
        }
    };

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAdditionalImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!currentUser?.token) {
            console.error("No token found.");
            return;
        }
        
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", typeof product.price === "string" ? parseFloat(product.price).toString() : product.price.toString());
        formData.append("stock", typeof product.stock === "string" ? parseInt(product.stock, 10).toString() : product.stock.toString());
        formData.append("categoryId", product.categoryId);
        

        const productsService = new ProductsService("https://beard-nest.vercel.app/");
        const imagesService = new ImagesService("https://beard-nest.vercel.app/");

        try {
            // Llamada para agregar el producto
            const createdProduct = await productsService.addProduct(currentUser.token, product);
            console.log('createdProduct', createdProduct);
            
            // Llamada para subir las imágenes adicionales
            if (additionalImages.length > 0) {
                await imagesService.addImages(currentUser.token, createdProduct.id, additionalImages);
            }

            alert("Producto creado con éxito");
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Crear Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descripción</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Categoría</label>
                    <select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="" disabled>Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Imagen Principal</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Imágenes Adicionales</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded"
                >
                    Crear Producto
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;
