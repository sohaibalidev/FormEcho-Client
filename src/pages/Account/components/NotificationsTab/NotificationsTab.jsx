import styles from "./NotificationsTab.module.css";

const notificationSettings = [
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive email alerts for new form submissions",
    defaultChecked: true,
  },
  {
    id: "weekly",
    title: "Weekly Reports",
    description: "Get weekly summary of your form activity",
    defaultChecked: true,
  },
  {
    id: "updates",
    title: "Product Updates",
    description: "News about new features and improvements",
    defaultChecked: false,
  },
];

export const NotificationsTab = () => (
  <div className="card">
    <h2 className={styles.sectionTitle}>Notification Preferences</h2>
    <div className={styles.notificationsContent}>
      {notificationSettings.map((setting) => (
        <NotificationItem key={setting.id} {...setting} />
      ))}
      <div className={styles.notificationActions}>
        <button className="btn btn-primary">Save Preferences</button>
      </div>
    </div>
  </div>
);

const NotificationItem = ({ title, description, defaultChecked }) => (
  <div className={styles.notificationItem}>
    <div className={styles.notificationInfo}>
      <h3 className={styles.notificationTitle}>{title}</h3>
      <p className={styles.notificationDescription}>{description}</p>
    </div>
    <label className={styles.toggle}>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className={styles.toggleInput}
      />
      <span className={styles.toggleSlider}></span>
    </label>
  </div>
);
