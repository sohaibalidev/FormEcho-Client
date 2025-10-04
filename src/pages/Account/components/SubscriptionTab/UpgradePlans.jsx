import { Key, Zap, Crown } from "lucide-react";
import styles from "./UpgradePlans.module.css";

const tiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for small projects",
    features: [
      "100 submissions/month",
      "Basic email notifications",
      "7-day retention",
    ],
    icon: Key,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    description: "For growing businesses",
    features: [
      "10,000 submissions/month",
      "Advanced notifications",
      "30-day retention",
      "Priority support",
    ],
    icon: Zap,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    description: "For large organizations",
    features: [
      "Unlimited submissions",
      "Custom integrations",
      "1-year retention",
      "24/7 support",
      "Custom domains",
    ],
    icon: Crown,
  },
];

export const UpgradePlans = ({ user, isLoading, onUpgrade }) => (
  <div className={styles.upgradeGrid}>
    {tiers.map((tier) => {
      const Icon = tier.icon;
      const isCurrent = user?.tier === tier.id;

      return (
        <div
          key={tier.id}
          className={`${styles.upgradeCard} ${
            isCurrent ? styles.upgradeCardCurrent : ""
          }`}
        >
          <div className={styles.upgradeHeader}>
            <Icon className={styles.upgradeIcon} />
            <h3 className={styles.upgradeName}>{tier.name}</h3>
          </div>
          <div className={styles.upgradePrice}>
            <div className={styles.price}>{tier.price}</div>
            <div className={styles.pricePeriod}>per month</div>
          </div>
          <p className={styles.upgradeDescription}>{tier.description}</p>
          <ul className={styles.upgradeFeatures}>
            {tier.features.map((feature, index) => (
              <li key={index} className={styles.upgradeFeature}>
                <div className={styles.featureDot}></div>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onUpgrade(tier.id)}
            disabled={isCurrent || isLoading}
            className={`btn ${isCurrent ? "btn-secondary" : "btn-primary"} ${
              styles.upgradeButton
            }`}
          >
            {isCurrent ? "Current Plan" : "Upgrade"}
          </button>
        </div>
      );
    })}
  </div>
);
