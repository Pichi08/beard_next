// components/product-preview/ProductPreview.tsx

import styles from './ProductPreview.module.css';
import { FaHeart, FaEye } from 'react-icons/fa';
import { Product } from '@/interfaces/product';
import { useRouter } from "next/navigation";


interface ProductPreviewProps {
  product: Product;
}

export default function ProductPreview({ product }: ProductPreviewProps) {

  const router = useRouter();

  const handlleClick = () => {
    router.push(`/product/${product.slug}`);
  }

  return (
    <div className={styles.productCard} onClick={handlleClick}>
      <div className={styles.imageContainer}>
        <img
          src={product.main_url_image}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.icons}>
          <button className={styles.iconButton}>
            <FaHeart />
          </button>
          <button className={styles.iconButton}>
            <FaEye />
          </button>
        </div>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>${product.price}</p>
        <div className={styles.productRating}>
          <span className={styles.stars}>
            {'⭐'.repeat(Math.round(product.rating))}
          </span>
          {/* <span className={styles.reviewCount}>({product.reviewCount})</span> */}
        </div>
      </div>
    </div>
  );
}
