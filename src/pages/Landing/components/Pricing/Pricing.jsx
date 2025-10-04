import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Pricing.module.css";

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for small projects",
    features: [
      "100 submissions/month",
      "Basic email notifications",
      "7-day retention",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "For growing businesses",
    features: [
      "10,000 submissions/month",
      "Advanced notifications",
      "30-day retention",
      "Priority support",
    ],
  },
  {
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
  },
];

const PricingCard = ({ tier, isFeatured }) => (
  <div
    className={`${styles.pricingCard} ${
      isFeatured ? styles.pricingCardFeatured : ""
    }`}
  >
    <div className={styles.pricingHeader}>
      <h3 className={styles.pricingTitle}>{tier.name}</h3>
      <div className={styles.pricingAmount}>
        {tier.price}
        <span className={styles.pricingPeriod}>/month</span>
      </div>
      <p className={styles.pricingDescription}>{tier.description}</p>
    </div>
    <ul className={styles.featuresList}>
      {tier.features.map((feature, featureIndex) => (
        <li key={featureIndex} className={styles.featureItem}>
          <Check className={styles.featureCheck} />
          <span className={styles.featureText}>{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      to="/auth"
      className={`${styles.pricingButton} ${
        isFeatured ? styles.pricingButtonPrimary : styles.pricingButtonSecondary
      }`}
    >
      Get Started
    </Link>
  </div>
);

export const Pricing = () => {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>
          <p className={styles.sectionDescription}>
            Choose the plan that works best for your needs. All plans include
            core features.
          </p>
        </div>
        <div className={styles.pricingGrid}>
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              isFeatured={tier.name === "Pro"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
