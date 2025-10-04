import { Zap, Shield, Mail } from "lucide-react";
import styles from "./Features.module.css";

const features = [
  {
    icon: Zap,
    title: "Easy Integration",
    description: "Add forms to your website with just a few lines of code.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with encrypted data transmission.",
  },
  {
    icon: Mail,
    title: "Instant Notifications",
    description: "Get email notifications for every form submission instantly.",
  },
];

export const Features = () => {
  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Powerful Features</h2>
          <p className={styles.sectionDescription}>
            Everything you need to handle form submissions efficiently and
            securely.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <feature.icon className={styles.featureIconSvg} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
