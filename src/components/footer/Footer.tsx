import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Subscription Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Beard</h3>
          <p>Suscríbete</p>
          <p>Obten el 10% en tu primera compra</p>
          <form className={styles.subscriptionForm}>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className={styles.subscriptionInput}
            />
            <button type="submit" className={styles.subscriptionButton}>
              Suscribirse
            </button>
          </form>
        </div>

        {/* Support Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Soporte</h3>
          <p>Cl. 18 #122-135, Barrio Panec, Cali, Valle del Cauca</p>
          <p>agroart@gmail.com</p>
          <p>(602) 5552334</p>
        </div>

        {/* Account Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cuenta</h3>
          <ul className={styles.linkList}>
            <li><a href="#">Mi cuenta</a></li>
            <li><a href="#">Ingresar / Registrarse</a></li>
            <li><a href="#">Carrito</a></li>
            <li><a href="#">Productos</a></li>
          </ul>
        </div>

        {/* Links Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Links</h3>
          <ul className={styles.linkList}>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">PQRS</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.bottomFooter}>
        <p>© Copyright Rimel 2022. All rights reserved</p>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}>F</a>
          <a href="#" aria-label="Instagram" className={styles.socialIcon}>I</a>
        </div>
      </div>
    </footer>
  );
}
