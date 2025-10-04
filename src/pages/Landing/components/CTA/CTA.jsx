import { Link } from "react-router-dom";
import styles from "./CTA.module.css";

export const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of developers who trust FormEcho for their form
            submission needs.
          </p>
          <Link to="/auth" className={styles.ctaButton}>
            Create Your Free Account
          </Link>
        </div>
      </div>
    </section>
  );
};
