import  { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import {
  Users,
  Mail,
  Zap,
  Crown,
  Ban,
  CheckCircle,
  XCircle,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./Admin.module.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers(currentPage);
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId, updates) => {
    try {
      await adminService.updateUserStatus(userId, updates);
      loadUsers(); 
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleMarkPayment = async (userId, paid) => {
    try {
      await adminService.markPayment(userId, paid);
      loadUsers();
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  const handleSuspendUser = async (userId, suspended) => {
    try {
      await adminService.suspendUser(userId, suspended);
      loadUsers();
    } catch (error) {
      console.error("Failed to suspend user:", error);
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case "enterprise":
        return <Crown className={styles.tierIcon} />;
      case "pro":
        return <Zap className={styles.tierIcon} />;
      default:
        return <Users className={styles.tierIcon} />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "enterprise":
        return styles.tierEnterprise;
      case "pro":
        return styles.tierPro;
      default:
        return styles.tierFree;
    }
  };

  if (loading && users.length === 0) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Super Admin Dashboard</h1>
        <p className={styles.subtitle}>Manage all users and subscriptions</p>
      </div>

      <div className={styles.statsGrid}>
        <div className="card">
          <div className={styles.statItem}>
            <Users className={`${styles.statIcon} ${styles.blue}`} />
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Users</p>
              <p className={styles.statValue}>{users.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className={styles.statItem}>
            <Crown className={`${styles.statIcon} ${styles.purple}`} />
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Enterprise</p>
              <p className={styles.statValue}>
                {users.filter((u) => u.tier === "enterprise").length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className={styles.statItem}>
            <Zap className={`${styles.statIcon} ${styles.blue}`} />
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Pro</p>
              <p className={styles.statValue}>
                {users.filter((u) => u.tier === "pro").length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className={styles.statItem}>
            <Mail className={`${styles.statIcon} ${styles.green}`} />
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Active</p>
              <p className={styles.statValue}>
                {users.filter((u) => !u.suspended).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All Users</h2>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeaderCell}>User</th>
                <th className={styles.tableHeaderCell}>Tier</th>
                <th className={styles.tableHeaderCell}>Usage</th>
                <th className={styles.tableHeaderCell}>Subscription</th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th className={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.map((user) => (
                <tr key={user._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.tierInfo}>
                      {getTierIcon(user.tier)}
                      <span
                        className={`${styles.tierBadge} ${getTierColor(
                          user.tier
                        )}`}
                      >
                        {user.tier}
                      </span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.usageInfo}>
                      <div className={styles.usageTotal}>
                        Total: {user.totalSubmissions || 0}
                      </div>
                      <div className={styles.usageMonthly}>
                        This month: {user.monthlySubmissions || 0}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.subscriptionInfo}>
                      <div className={styles.subscriptionDate}>
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                      <div className={styles.paymentDate}>
                        Next payment:{" "}
                        {new Date(user.nextPaymentDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.statusInfo}>
                      {user.paid ? (
                        <CheckCircle className={styles.statusIconPaid} />
                      ) : (
                        <XCircle className={styles.statusIconUnpaid} />
                      )}
                      <span
                        className={
                          user.paid ? styles.statusPaid : styles.statusUnpaid
                        }
                      >
                        {user.paid ? "Paid" : "Unpaid"}
                      </span>
                      {user.suspended && (
                        <Ban className={styles.statusIconSuspended} />
                      )}
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleMarkPayment(user._id, !user.paid)}
                        className={`${styles.actionButton} ${
                          user.paid
                            ? styles.actionButtonUnpaid
                            : styles.actionButtonPaid
                        }`}
                      >
                        {user.paid ? "Mark Unpaid" : "Mark Paid"}
                      </button>
                      <button
                        onClick={() =>
                          handleSuspendUser(user._id, !user.suspended)
                        }
                        className={`${styles.actionButton} ${
                          user.suspended
                            ? styles.actionButtonResume
                            : styles.actionButtonSuspend
                        }`}
                      >
                        {user.suspended ? "Resume" : "Suspend"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
