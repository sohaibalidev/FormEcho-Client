import { useEffect, useState } from "react";
import { useApi } from "@/contexts/ApiContext";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "./components/DashboardHeader/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid/StatsGrid";
import { ActionsGrid } from "./components/ActionsGrid/ActionsGrid";
import { RecentSubmissions } from "./components/RecentSubmissions/RecentSubmissions";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { stats, getStats, loading } = useApi();
  const { user } = useAuth();
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    getStats();
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

  if (loading && !stats) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <DashboardHeader user={user} />

      <StatsGrid stats={stats} user={user} />

      <ActionsGrid />

      <RecentSubmissions messages={recentMessages} />
    </div>
  );
};

export default Dashboard;
