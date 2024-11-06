import React from 'react';
import { Metadata } from 'next';
import { ProductsService } from '@/services/products.service';
import Footer from '@/components/footer/Footer';
import EditProduct from '@/components/edit-product/EditProduct';

interface Props {
   params: { slug: string }
}

async function getProductBySlug(slug: string) {
    const productService =  new ProductsService("https://beard-nest.vercel.app/");
    const response = await productService.getProductBySlug(slug);
    return response;
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const product = await getProductBySlug(params.slug);

    return {
        title: product.name,
        description: product.description,
    };
}

async function ProductEditPage({ params }: Props){
    return (
        <div>
            <EditProduct slug={params.slug} />
            <Footer />
            
        </div>
    );
}

export default ProductEditPage;
