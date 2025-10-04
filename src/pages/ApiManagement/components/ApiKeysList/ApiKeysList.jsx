import { Copy, Trash2, Key } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./ApiKeysList.module.css";

export const ApiKeysList = ({ apiKeys, loading, onCopyKey, onRevokeKey }) => {
  if (loading) {
    return (
      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your API Keys</h2>
        </div>
        <div className={styles.keysSection}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Your API Keys</h2>
      </div>

      <div className={styles.keysSection}>
        {apiKeys.length > 0 ? (
          <div className={styles.keysList}>
            {apiKeys.map((key) => (
              <ApiKeyItem
                key={key._id}
                apiKey={key}
                onCopyKey={onCopyKey}
                onRevokeKey={onRevokeKey}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

const ApiKeyItem = ({ apiKey, onCopyKey, onRevokeKey }) => (
  <div className={styles.keyItem}>
    <div className={styles.keyInfo}>
      <div className={styles.apiKeyName}>{apiKey.name}</div>
      <div className={styles.keyMeta}>
        <span className={styles.keyDate}>
          Created {new Date(apiKey.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className={styles.keyValue}>
        <code className={styles.keyCode}>{apiKey.key}</code>
        <button
          onClick={() => onCopyKey(apiKey.key)}
          className={styles.copyButton}
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
    <button
      onClick={() => onRevokeKey(apiKey._id)}
      className={styles.revokeButton}
    >
      <Trash2 size={16} />
    </button>
  </div>
);

const EmptyState = () => (
  <div className={styles.emptyState}>
    <Key className={styles.emptyIcon} />
    <p className={styles.emptyText}>No API keys generated yet</p>
    <p className={styles.emptyDescription}>
      Generate your first API key to start receiving form submissions
    </p>
  </div>
);
