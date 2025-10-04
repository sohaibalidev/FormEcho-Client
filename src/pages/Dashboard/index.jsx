import React, { useEffect, useState } from "react";
import { useApi } from "@/contexts/ApiContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { MessageSquare, Key, Zap, TrendingUp } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { stats, getStats, loading } = useApi();
  const { user } = useAuth();
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    getStats();
    // In a real app, you'd fetch recent messages here
    setRecentMessages([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        createdAt: new Date(Date.now() - 1000000),
      },
    ]);
  }, []);

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

  if (loading && !stats) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, {user?.name}!</p>
        </div>
        <Link to="/api-keys" className="btn btn-primary">
          Manage API Keys
        </Link>
      </div>

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

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Submissions</h2>
        </div>
        <div className={styles.sectionContent}>
          {recentMessages.length > 0 ? (
            <div className={styles.messagesList}>
              {recentMessages.map((message) => (
                <div key={message.id} className={styles.messageItem}>
                  <div>
                    <p className={styles.messageName}>{message.name}</p>
                    <p className={styles.messageEmail}>{message.email}</p>
                  </div>
                  <div className={styles.messageDate}>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <MessageSquare className={styles.emptyIcon} />
              <p className={styles.emptyText}>No submissions yet</p>
              <p className={styles.emptyDescription}>
                Set up your form integration to start receiving submissions
              </p>
            </div>
          )}
          {recentMessages.length > 0 && (
            <div className={styles.viewAll}>
              <Link to="/messages" className={styles.viewAllLink}>
                View all messages
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
