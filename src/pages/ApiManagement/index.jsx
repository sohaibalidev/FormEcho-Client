// src/pages/ApiManagement/index.jsx
import React, { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { Copy, Trash2, Key, Zap, Crown } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./ApiManagement.module.css";

const ApiManagement = () => {
  const { apiKeys, generateApiKey, revokeApiKey, getApiKeys, loading } =
    useApi();
  const [selectedTier, setSelectedTier] = useState("free");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    getApiKeys();
  }, []);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      await generateApiKey(selectedTier);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    // You could add a toast notification here
  };

  const handleRevokeKey = async (keyId) => {
    if (window.confirm("Are you sure you want to revoke this API key?")) {
      await revokeApiKey(keyId);
    }
  };

  const tiers = [
    {
      id: "free",
      name: "Free",
      limit: "100 submissions/month",
      icon: Key,
      color: "gray",
    },
    {
      id: "pro",
      name: "Pro",
      limit: "10,000 submissions/month",
      icon: Zap,
      color: "blue",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      limit: "Unlimited submissions",
      icon: Crown,
      color: "purple",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>API Keys</h1>
        <p className={styles.subtitle}>
          Manage your API keys and access levels
        </p>
      </div>

      {/* Key Generation */}
      <div className="card">
        <h2 className={styles.sectionTitle}>Generate New API Key</h2>

        <div className={styles.generationSection}>
          <div className={styles.tierSelection}>
            <label className={styles.tierLabel}>Select Tier</label>
            <div className={styles.tiersGrid}>
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.id}
                    className={`${styles.tierCard} ${
                      selectedTier === tier.id ? styles.tierCardSelected : ""
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <div className={styles.tierHeader}>
                      <Icon
                        className={`${styles.tierIcon} ${styles[tier.color]}`}
                      />
                      <span className={styles.tierName}>{tier.name}</span>
                    </div>
                    <p className={styles.tierLimit}>{tier.limit}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleGenerateKey}
            disabled={isGenerating}
            className={`btn btn-primary ${styles.generateButton}`}
          >
            {isGenerating ? <LoadingSpinner size="sm" /> : "Generate API Key"}
          </button>
        </div>
      </div>

      {/* Existing Keys */}
      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your API Keys</h2>
        </div>

        <div className={styles.keysSection}>
          {loading ? (
            <LoadingSpinner />
          ) : apiKeys.length > 0 ? (
            <div className={styles.keysList}>
              {apiKeys.map((key) => (
                <div key={key._id} className={styles.keyItem}>
                  <div className={styles.keyInfo}>
                    <div className={styles.keyMeta}>
                      <span
                        className={`${styles.tierBadge} ${styles[key.tier]}`}
                      >
                        {key.tier.charAt(0).toUpperCase() + key.tier.slice(1)}
                      </span>
                      <span className={styles.keyDate}>
                        Created {new Date(key.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.keyValue}>
                      <code className={styles.keyCode}>{key.key}</code>
                      <button
                        onClick={() => handleCopyKey(key.key)}
                        className={styles.copyButton}
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRevokeKey(key._id)}
                    className={styles.revokeButton}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Key className={styles.emptyIcon} />
              <p className={styles.emptyText}>No API keys generated yet</p>
              <p className={styles.emptyDescription}>
                Generate your first API key to start receiving form submissions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Integration Guide */}
      <div className={styles.integrationGuide}>
        <h3 className={styles.guideTitle}>Integration Guide</h3>
        <div className={styles.guideContent}>
          <p className={styles.guideText}>
            Add this script to your website to start receiving form submissions:
          </p>
          <pre className={styles.codeBlock}>
            {`<script>
  window.FormEchoConfig = {
    apiKey: 'YOUR_API_KEY_HERE'
  };
</script>
<script src="https://cdn.formecho.com/formecho.js"></script>`}
          </pre>
          <p className={styles.guideNote}>
            Your forms will automatically be intercepted and submissions will be
            sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiManagement;
