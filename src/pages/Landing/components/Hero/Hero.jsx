import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Form Submissions Made Simple</h1>
          <p className={styles.heroDescription}>
            Collect form submissions from any website and get instant email
            notifications. No backend required. Just add our script and start
            receiving submissions.
          </p>
          <div className={styles.heroActions}>
            <Link to="/auth" className={styles.primaryButton}>
              Start Free Trial
            </Link>
            <button className={styles.secondaryButton}>View Demo</button>
          </div>
        </div>
      </div>
    </section>
  );
};
