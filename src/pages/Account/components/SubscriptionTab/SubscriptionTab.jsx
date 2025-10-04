import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/contexts/ApiContext";
import { CurrentPlan } from "./CurrentPlan";
import { UsageStats } from "./UsageStats";
import { UpgradePlans } from "./UpgradePlans";
import styles from "./SubscriptionTab.module.css";

export const SubscriptionTab = () => {
  const { user } = useAuth();
  const { stats } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (tier) => {
    setIsLoading(true);
    try {
      alert(`Upgrading to ${tier} plan...`);
      // await apiService.upgradeTier(tier)
    } catch (error) {
      console.error("Upgrade failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.subscriptionContent}>
      <div className="card">
        <CurrentPlan user={user} />
        <UsageStats stats={stats} />
      </div>

      <div className="card">
        <h2 className={styles.sectionTitle}>Upgrade Your Plan</h2>
        <UpgradePlans
          user={user}
          isLoading={isLoading}
          onUpgrade={handleUpgrade}
        />
      </div>
    </div>
  );
};
