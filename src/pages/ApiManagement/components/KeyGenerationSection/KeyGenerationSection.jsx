import { Key, Zap, Crown } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./KeyGenerationSection.module.css";

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

export const KeyGenerationSection = ({
  selectedTier,
  onTierChange,
  onGenerateKey,
  isGenerating,
}) => {
  return (
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
                  onClick={() => onTierChange(tier.id)}
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
          onClick={onGenerateKey}
          disabled={isGenerating}
          className={`btn btn-primary ${styles.generateButton}`}
        >
          {isGenerating ? <LoadingSpinner size="sm" /> : "Generate API Key"}
        </button>
      </div>
    </div>
  );
};
