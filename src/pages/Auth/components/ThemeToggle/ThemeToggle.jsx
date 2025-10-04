import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`${styles.themeToggle} ${isDarkMode ? styles.dark : ""}`}
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={20} className={styles.themeIcon} />
      ) : (
        <Moon size={20} className={styles.themeIcon} />
      )}
    </button>
  );
};