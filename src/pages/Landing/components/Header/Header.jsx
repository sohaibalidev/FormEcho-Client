import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}></div>
            <span className={styles.logoText}>FormEcho</span>
          </div>
          <nav className={styles.nav}>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <a href="#pricing" className={styles.navLink}>
              Pricing
            </a>
            <Link to="/login" className={styles.navLink}>
              Sign In
            </Link>
            <Link to="/register" className={styles.ctaButton}>
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
