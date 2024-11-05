import React from 'react';
import { Metadata } from 'next';
import { ProductsService } from '@/services/products.service';
import Footer from '@/components/footer/Footer'; // Importando el Footer
import ProductDetail from '@/components/product-detail/ProductDetail';

interface Props {
   params: { slug: string }
}

async function getProduct(slug: string) {
    const productService =  new ProductsService("https://beard-nest.vercel.app/");
    const response = await productService.getProductBySlug(slug);
    return response;
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const product = await getProduct(params.slug);

    return {
        title: product.name,
        description: product.description,
    };
}

async function ProductDetailPage({ params }: Props){
    return (
        <div>
            <ProductDetail slug={params.slug} />
            <Footer />
            
        </div>
    );
}

export default ProductDetailPage;
