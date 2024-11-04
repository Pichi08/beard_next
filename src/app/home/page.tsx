// app/home/page.tsx
"use client"

import styles from './home.module.css';
import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from '@/components/footer/Footer';
import ProductPreview from '@/components/product-preview/ProductPreview';
import { useProducts } from '@/hooks/products/useProducts';
import { Product } from '@/interfaces/product';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { useEffect, useState } from 'react';

export default function HomePage() {
  // Call the hook to get products data
  // const { products } = useProducts();
  const { user: currentUser } = useCurrentUser();
  const { products } = useProducts();
  // const productList: Product[] = await products(currentUser?.token); // Specify productList type as Product[]
  //console.log(currentUser?.token)
  console.log('products', products)


  return (
    <div className={styles.container}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Banner */}
      <section className={styles.hero}>
        <img
          src="/path/to/hero-image.jpg" // Replace with actual path
          alt="Beard Care Products"
          className={styles.heroImage}
        />
      </section>

      {/* Product Preview Section */}
      <section className={styles.products}>
        <h2 className={styles.sectionTitle}>Productos Destacados</h2>
        <div className={styles.productList}>
          {/* {productList.map((product: Product) => (
            <ProductPreview key={product.id} product={product} />
          ))} */}
        </div>
        <button className={styles.viewAllButton}>Ver todos los productos</button>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Buscar por categorías</h2>
        {/* <CategoriesSection /> */}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
