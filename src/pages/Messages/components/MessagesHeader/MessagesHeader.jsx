import styles from "./MessagesHeader.module.css";

export const MessagesHeader = () => {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Form Submissions</h1>
        <p className={styles.subtitle}>View all messages from your forms</p>
      </div>
    </div>
  );
};
