import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./AuthHeader.module.css";

export const AuthHeader = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <img src="/favicon.ico" alt="FormEcho" className={styles.logoImage} />
        </div>
      </Link>
      <h1 className={`${styles.title} ${isDarkMode ? styles.dark : ""}`}>
        Welcome to FormEcho
      </h1>
      <p className={`${styles.subtitle} ${isDarkMode ? styles.dark : ""}`}>
        Streamline your form submissions with ease
      </p>
    </div>
  );
};
