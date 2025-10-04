import { Link } from "react-router-dom";
import { Key, MessageSquare, Zap } from "lucide-react";
import styles from "./ActionsGrid.module.css";

export const ActionsGrid = () => {
  return (
    <div className={styles.actionsGrid}>
      <Link to="/api-keys" className={styles.actionCard}>
        <Key className={`${styles.actionIcon} ${styles.blue}`} />
        <h3 className={styles.actionTitle}>API Keys</h3>
        <p className={styles.actionDescription}>
          Manage your API keys and access levels
        </p>
      </Link>

      <Link to="/messages" className={styles.actionCard}>
        <MessageSquare className={`${styles.actionIcon} ${styles.green}`} />
        <h3 className={styles.actionTitle}>Messages</h3>
        <p className={styles.actionDescription}>View all form submissions</p>
      </Link>

      <Link to="/account" className={styles.actionCard}>
        <Zap className={`${styles.actionIcon} ${styles.purple}`} />
        <h3 className={styles.actionTitle}>Upgrade Plan</h3>
        <p className={styles.actionDescription}>
          Unlock more features and higher limits
        </p>
      </Link>
    </div>
  );
};
