import { Link } from "react-router-dom";
import styles from "./DashboardHeader.module.css";

export const DashboardHeader = ({ user }) => {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back, {user?.name}!</p>
      </div>
      <Link to="/api-keys" className="btn btn-primary">
        Manage API Keys
      </Link>
    </div>
  );
};
