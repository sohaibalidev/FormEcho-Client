import { Menu } from "lucide-react";
import styles from "./Header.module.css";

const Header = ({ onMenuClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button
          onClick={onMenuClick}
          className={styles.menuButton}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className={styles.title}>FormEcho</h1>
        <div className={styles.placeholder}></div>
      </div>
    </header>
  );
};

export default Header;
