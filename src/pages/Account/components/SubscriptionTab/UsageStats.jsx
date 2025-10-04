import styles from "./UsageStats.module.css";

export const UsageStats = ({ stats }) => (
  <div className={styles.usageStats}>
    <div className={styles.usageCard}>
      <div className={styles.usageLabel}>Monthly Usage</div>
      <div className={styles.usageValue}>{stats?.monthlySubmissions || 0}</div>
      <div className={styles.usageUnit}>submissions</div>
    </div>
    <div className={styles.usageCard}>
      <div className={styles.usageLabel}>Total Usage</div>
      <div className={styles.usageValue}>{stats?.totalSubmissions || 0}</div>
      <div className={styles.usageUnit}>submissions</div>
    </div>
    <div className={styles.usageCard}>
      <div className={styles.usageLabel}>API Keys</div>
      <div className={styles.usageValue}>{stats?.activeKeys || 0}</div>
      <div className={styles.usageUnit}>active keys</div>
    </div>
  </div>
);
