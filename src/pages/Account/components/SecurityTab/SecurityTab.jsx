import styles from "./SecurityTab.module.css";

export const SecurityTab = () => (
  <div className="card">
    <h2 className={styles.sectionTitle}>Security Settings</h2>
    <div className={styles.securityContent}>
      <TwoFactorSection />
      <div className={styles.securityDivider}></div>
      <DangerZoneSection />
    </div>
  </div>
);

const TwoFactorSection = () => (
  <div className={styles.securitySection}>
    <h3 className={styles.securitySectionTitle}>Two-Factor Authentication</h3>
    <p className={styles.securityDescription}>
      Add an extra layer of security to your account.
    </p>
    <button className="btn btn-secondary">Enable 2FA</button>
  </div>
);

const DangerZoneSection = () => (
  <div className={styles.securitySection}>
    <h3 className={styles.dangerTitle}>Danger Zone</h3>
    <div className={styles.dangerItem}>
      <div className={styles.dangerInfo}>
        <p className={styles.dangerName}>Delete Account</p>
        <p className={styles.dangerDescription}>
          Permanently delete your account and all data
        </p>
      </div>
      <button className="btn btn-danger">Delete Account</button>
    </div>
  </div>
);
