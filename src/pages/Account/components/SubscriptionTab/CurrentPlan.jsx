import { Key, Zap, Crown } from "lucide-react";
import styles from "./CurrentPlan.module.css";

const tierIcons = {
  free: Key,
  pro: Zap,
  enterprise: Crown,
};

export const CurrentPlan = ({ user }) => {
  const tiers = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      description: "Perfect for small projects",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$19",
      description: "For growing businesses",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99",
      description: "For large organizations",
    },
  ];

  const currentTier = tiers.find((tier) => tier.id === user?.tier);
  if (!currentTier) return null;

  const Icon = tierIcons[currentTier.id] || Key;

  return (
    <>
      <h2 className={styles.sectionTitle}>Current Plan</h2>
      <div className={styles.currentPlan}>
        <div className={styles.planHeader}>
          <Icon className={styles.planIcon} />
          <div className={styles.planInfo}>
            <h3 className={styles.planName}>{currentTier.name}</h3>
            <p className={styles.planDescription}>{currentTier.description}</p>
          </div>
        </div>
        <div className={styles.planPrice}>
          <div className={styles.price}>{currentTier.price}</div>
          <div className={styles.pricePeriod}>per month</div>
        </div>
      </div>
    </>
  );
};
