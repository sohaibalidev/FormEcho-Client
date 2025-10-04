import LoadingSpinner from "@/components/LoadingSpinner";
import { MessageCard } from "./MessageCard/MessageCard";
import { EmptyState } from "./EmptyState/EmptyState";
import styles from "./MessagesList.module.css";

export const MessagesList = ({ messages, loading, searchTerm }) => {
  if (loading) {
    return (
      <div className={styles.messagesContent}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.messagesContent}>
      {messages.length > 0 ? (
        <div className={styles.messagesList}>
          {messages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}
        </div>
      ) : (
        <EmptyState searchTerm={searchTerm} />
      )}
    </div>
  );
};
