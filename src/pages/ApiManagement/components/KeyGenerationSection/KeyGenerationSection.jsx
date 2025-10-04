import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./KeyGenerationSection.module.css";

export const KeyGenerationSection = ({ onGenerateKey, isGenerating }) => {
  const [keyName, setKeyName] = useState();

  const handleGenerate = () => {
    onGenerateKey(keyName);
    setKeyName("");
  };

  return (
    <div className="card">
      <h2 className={styles.sectionTitle}>Generate New API Key</h2>

      <div className={styles.generationSection}>
        <div className={styles.formGroup}>
          <label htmlFor="key-name" className={styles.label}>
            Key Name (Optional)
          </label>
          <input
            id="key-name"
            type="text"
            placeholder="e.g., Production Key, Development Key"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className={styles.input}
          />
          <p className={styles.helperText}>
            Give your key a descriptive name to identify its purpose
          </p>
        </div>

        <div className={styles.sectionFooter}>
          <div className={styles.note}>
            <p>
              <strong>Note:</strong> API keys will inherit your account's tier
              limits automatically.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={styles.generateButton}
          >
            {isGenerating ? (
              <>
                <LoadingSpinner size="sm" />
                Generating...
              </>
            ) : (
              "Generate API Key"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
