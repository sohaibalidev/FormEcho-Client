import { useAuth } from "@/contexts/AuthContext";
import styles from "./ProfileTab.module.css";

export const ProfileTab = () => {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2 className={styles.sectionTitle}>Profile Information</h2>
      <div className={styles.profileContent}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input type="text" defaultValue={user?.name} className="input" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" defaultValue={user?.email} className="input" />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Company (Optional)</label>
          <input
            type="text"
            placeholder="Your company name"
            className="input"
          />
        </div>
        <div className={styles.formActions}>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};
