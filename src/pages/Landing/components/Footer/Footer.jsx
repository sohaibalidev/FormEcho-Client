import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logoIcon}></div>
            <span className={styles.logoText}>FormEcho</span>
          </div>
          <div className={styles.footerCopyright}>
            &copy; 2024 FormEcho. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
