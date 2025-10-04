import { Calendar } from "lucide-react";
import styles from "./MessageCard.module.css";

const FormData = ({ fields }) => {
  if (!fields || Object.keys(fields).length === 0) return null;

  return (
    <div className={styles.formData}>
      <h4 className={styles.formDataTitle}>Form Data:</h4>
      <div className={styles.formDataGrid}>
        {Object.entries(fields).map(([key, value]) => (
          <div key={key} className={styles.formDataItem}>
            <span className={styles.formDataKey}>{key}:</span>
            <span className={styles.formDataValue}>{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MessageCard = ({ message }) => {
  return (
    <div className={styles.messageCard}>
      <div className={styles.messageHeader}>
        <div>
          <h3 className={styles.messageName}>{message.name}</h3>
          <p className={styles.messageEmail}>{message.email}</p>
        </div>
        <div className={styles.messageDate}>
          <Calendar size={16} className={styles.dateIcon} />
          {new Date(message.createdAt).toLocaleDateString()}
        </div>
      </div>

      {message.message && (
        <div className={styles.messageBody}>
          <p className={styles.messageText}>{message.message}</p>
        </div>
      )}

      <FormData fields={message.fields} />
    </div>
  );
};
