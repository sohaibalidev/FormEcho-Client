import { MessageSquare, Key, Zap, TrendingUp } from "lucide-react";
import styles from "./StatsGrid.module.css";

const StatCard = ({ title, value, icon: Icon, color = "blue" }) => (
  <div className={styles.statCard}>
    <div className={styles.statContent}>
      <div className={`${styles.statIcon} ${styles[color]}`}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.statText}>
        <p className={styles.statTitle}>{title}</p>
        <p className={styles.statValue}>{value}</p>
      </div>
    </div>
  </div>
);

export const StatsGrid = ({ stats, user }) => {
  return (
    <div className={styles.statsGrid}>
      <StatCard
        title="Total Submissions"
        value={stats?.totalSubmissions || 0}
        icon={MessageSquare}
        color="blue"
      />
      <StatCard
        title="This Month"
        value={stats?.monthlySubmissions || 0}
        icon={TrendingUp}
        color="green"
      />
      <StatCard
        title="API Keys"
        value={stats?.activeKeys || 0}
        icon={Key}
        color="purple"
      />
      <StatCard
        title="Plan"
        value={
          user?.tier?.charAt(0).toUpperCase() + user?.tier?.slice(1) || "Free"
        }
        icon={Zap}
        color="yellow"
      />
    </div>
  );
};
