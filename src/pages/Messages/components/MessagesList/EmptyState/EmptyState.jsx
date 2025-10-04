import { Mail } from "lucide-react";
import styles from "./EmptyState.module.css";

export const EmptyState = ({ searchTerm }) => {
  return (
    <div className={styles.emptyState}>
      <Mail className={styles.emptyIcon} />
      <p className={styles.emptyText}>No messages found</p>
      <p className={styles.emptyDescription}>
        {searchTerm
          ? "Try adjusting your search terms"
          : "Form submissions will appear here"}
      </p>
    </div>
  );
};
