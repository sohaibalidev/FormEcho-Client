import { useEffect, useState } from "react";
import { useApi } from "@/contexts/ApiContext";
import { KeyGenerationSection } from "./components/KeyGenerationSection/KeyGenerationSection";
import { ApiKeysList } from "./components/ApiKeysList/ApiKeysList";
import { IntegrationGuide } from "./components/IntegrationGuide/IntegrationGuide";
import styles from "./ApiManagement.module.css";

const ApiManagement = () => {
  const { apiKeys, createApiKey, updateApiKey, fetchApiKeys, loading } =
    useApi();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleGenerateKey = async (keyName) => {
    setIsGenerating(true);
    try {
      await createApiKey({ name: keyName });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
  };

  const handleRevokeKey = async (keyId) => {
    if (window.confirm("Are you sure you want to revoke this API key?")) {
      await updateApiKey({ id: keyId, action: "revoke" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>API Keys</h1>
        <p className={styles.subtitle}>
          Manage your API keys and access levels
        </p>
      </div>

      <KeyGenerationSection
        onGenerateKey={handleGenerateKey}
        isGenerating={isGenerating}
      />

      <ApiKeysList
        apiKeys={apiKeys}
        loading={loading}
        onCopyKey={handleCopyKey}
        onRevokeKey={handleRevokeKey}
      />

      <IntegrationGuide />
    </div>
  );
};

export default ApiManagement;
