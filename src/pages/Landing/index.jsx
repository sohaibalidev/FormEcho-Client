import { Check, Zap, Shield, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  const features = [
    {
      icon: Zap,
      title: "Easy Integration",
      description: "Add forms to your website with just a few lines of code.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with encrypted data transmission.",
    },
    {
      icon: Mail,
      title: "Instant Notifications",
      description:
        "Get email notifications for every form submission instantly.",
    },
  ];

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}></div>
              <span className={styles.logoText}>FormEcho</span>
            </div>
            <nav className={styles.nav}>
              <a href="#features" className={styles.navLink}>
                Features
              </a>
              <a href="#pricing" className={styles.navLink}>
                Pricing
              </a>
              <Link to="/login" className={styles.navLink}>
                Sign In
              </Link>
              <Link to="/register" className={styles.ctaButton}>
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Form Submissions Made Simple</h1>
            <p className={styles.heroDescription}>
              Collect form submissions from any website and get instant email
              notifications. No backend required. Just add our script and start
              receiving submissions.
            </p>
            <div className={styles.heroActions}>
              <Link to="/register" className={styles.primaryButton}>
                Start Free Trial
              </Link>
              <button className={styles.secondaryButton}>View Demo</button>
            </div>
          </div>
        </div>
      </section>

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
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`${styles.pricingCard} ${
                  tier.name === "Pro" ? styles.pricingCardFeatured : ""
                }`}
              >
                <div className={styles.pricingHeader}>
                  <h3 className={styles.pricingTitle}>{tier.name}</h3>
                  <div className={styles.pricingAmount}>
                    {tier.price}
                    <span className={styles.pricingPeriod}>/month</span>
                  </div>
                  <p className={styles.pricingDescription}>
                    {tier.description}
                  </p>
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
                  to="/register"
                  className={`${styles.pricingButton} ${
                    tier.name === "Pro"
                      ? styles.pricingButtonPrimary
                      : styles.pricingButtonSecondary
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of developers who trust FormEcho for their form
              submission needs.
            </p>
            <Link to="/register" className={styles.ctaButton}>
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <div className={styles.logoIcon}></div>
              <span className={styles.logoText}>FormEcho</span>
            </div>
            <div className={styles.footerCopyright}>
              &copy; 2024 FormEcho. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
