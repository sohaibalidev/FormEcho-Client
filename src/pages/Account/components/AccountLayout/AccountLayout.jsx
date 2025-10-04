import styles from "./AccountLayout.module.css";

export const AccountHeader = ({ title, subtitle }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subtitle}>{subtitle}</p>
  </div>
);

export const AccountContent = ({ sidebar, main }) => (
  <div className={styles.content}>
    <div className={styles.sidebar}>{sidebar}</div>
    <div className={styles.main}>{main}</div>
  </div>
);
