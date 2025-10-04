import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import styles from "./RecentSubmissions.module.css";

const MessageItem = ({ message }) => (
  <div className={styles.messageItem}>
    <div>
      <p className={styles.messageName}>{message.name}</p>
      <p className={styles.messageEmail}>{message.email}</p>
    </div>
    <div className={styles.messageDate}>
      {new Date(message.createdAt).toLocaleDateString()}
    </div>
  </div>
);

const EmptyState = () => (
  <div className={styles.emptyState}>
    <MessageSquare className={styles.emptyIcon} />
    <p className={styles.emptyText}>No submissions yet</p>
    <p className={styles.emptyDescription}>
      Set up your form integration to start receiving submissions
    </p>
  </div>
);

export const RecentSubmissions = ({ messages }) => {
  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Submissions</h2>
      </div>
      <div className={styles.sectionContent}>
        {messages.length > 0 ? (
          <div className={styles.messagesList}>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        {messages.length > 0 && (
          <div className={styles.viewAll}>
            <Link to="/messages" className={styles.viewAllLink}>
              View all messages
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
