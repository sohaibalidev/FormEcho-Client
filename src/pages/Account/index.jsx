// src/pages/Account/index.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../contexts/ApiContext";
import {
  User,
  Mail,
  Shield,
  CreditCard,
  Bell,
  Zap,
  Crown,
  Key,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./Account.module.css";

const Account = () => {
  const { user } = useAuth();
  const { stats, getStats } = useApi();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getStats();
  }, []);

  const handleUpgrade = async (tier) => {
    setIsLoading(true);
    try {
      // In a real app, this would integrate with a payment processor
      alert(`Upgrading to ${tier} plan...`);
      // await apiService.upgradeTier(tier)
    } catch (error) {
      console.error("Upgrade failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      current: user?.tier === "free",
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
      current: user?.tier === "pro",
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
      current: user?.tier === "enterprise",
      icon: Crown,
    },
  ];

  const currentTier = tiers.find((tier) => tier.id === user?.tier);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>Manage your account and subscription</p>
      </div>

      <div className={styles.content}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            <button
              onClick={() => setActiveTab("profile")}
              className={`${styles.sidebarButton} ${
                activeTab === "profile" ? styles.sidebarButtonActive : ""
              }`}
            >
              <User size={18} className={styles.sidebarIcon} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`${styles.sidebarButton} ${
                activeTab === "subscription" ? styles.sidebarButtonActive : ""
              }`}
            >
              <CreditCard size={18} className={styles.sidebarIcon} />
              Subscription
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`${styles.sidebarButton} ${
                activeTab === "notifications" ? styles.sidebarButtonActive : ""
              }`}
            >
              <Bell size={18} className={styles.sidebarIcon} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`${styles.sidebarButton} ${
                activeTab === "security" ? styles.sidebarButtonActive : ""
              }`}
            >
              <Shield size={18} className={styles.sidebarIcon} />
              Security
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          {activeTab === "profile" && (
            <div className="card">
              <h2 className={styles.sectionTitle}>Profile Information</h2>
              <div className={styles.profileContent}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="input"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="input"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company (Optional)</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="input"
                  />
                </div>
                <div className={styles.formActions}>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className={styles.subscriptionContent}>
              {/* Current Plan */}
              <div className="card">
                <h2 className={styles.sectionTitle}>Current Plan</h2>
                {currentTier && (
                  <div className={styles.currentPlan}>
                    <div className={styles.planHeader}>
                      <currentTier.icon className={styles.planIcon} />
                      <div className={styles.planInfo}>
                        <h3 className={styles.planName}>{currentTier.name}</h3>
                        <p className={styles.planDescription}>
                          {currentTier.description}
                        </p>
                      </div>
                    </div>
                    <div className={styles.planPrice}>
                      <div className={styles.price}>{currentTier.price}</div>
                      <div className={styles.pricePeriod}>per month</div>
                    </div>
                  </div>
                )}

                {/* Usage Stats */}
                <div className={styles.usageStats}>
                  <div className={styles.usageCard}>
                    <div className={styles.usageLabel}>Monthly Usage</div>
                    <div className={styles.usageValue}>
                      {stats?.monthlySubmissions || 0}
                    </div>
                    <div className={styles.usageUnit}>submissions</div>
                  </div>
                  <div className={styles.usageCard}>
                    <div className={styles.usageLabel}>Total Usage</div>
                    <div className={styles.usageValue}>
                      {stats?.totalSubmissions || 0}
                    </div>
                    <div className={styles.usageUnit}>submissions</div>
                  </div>
                  <div className={styles.usageCard}>
                    <div className={styles.usageLabel}>API Keys</div>
                    <div className={styles.usageValue}>
                      {stats?.activeKeys || 0}
                    </div>
                    <div className={styles.usageUnit}>active keys</div>
                  </div>
                </div>
              </div>

              {/* Upgrade Options */}
              <div className="card">
                <h2 className={styles.sectionTitle}>Upgrade Your Plan</h2>
                <div className={styles.upgradeGrid}>
                  {tiers.map((tier) => {
                    const Icon = tier.icon;
                    return (
                      <div
                        key={tier.id}
                        className={`${styles.upgradeCard} ${
                          tier.current ? styles.upgradeCardCurrent : ""
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
                        <p className={styles.upgradeDescription}>
                          {tier.description}
                        </p>
                        <ul className={styles.upgradeFeatures}>
                          {tier.features.map((feature, index) => (
                            <li key={index} className={styles.upgradeFeature}>
                              <div className={styles.featureDot}></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleUpgrade(tier.id)}
                          disabled={tier.current || isLoading}
                          className={`btn ${
                            tier.current ? "btn-secondary" : "btn-primary"
                          } ${styles.upgradeButton}`}
                        >
                          {tier.current ? "Current Plan" : "Upgrade"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card">
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              <div className={styles.notificationsContent}>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationInfo}>
                    <h3 className={styles.notificationTitle}>
                      Email Notifications
                    </h3>
                    <p className={styles.notificationDescription}>
                      Receive email alerts for new form submissions
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className={styles.toggleInput}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div className={styles.notificationInfo}>
                    <h3 className={styles.notificationTitle}>Weekly Reports</h3>
                    <p className={styles.notificationDescription}>
                      Get weekly summary of your form activity
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className={styles.toggleInput}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div className={styles.notificationInfo}>
                    <h3 className={styles.notificationTitle}>
                      Product Updates
                    </h3>
                    <p className={styles.notificationDescription}>
                      News about new features and improvements
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" className={styles.toggleInput} />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>

                <div className={styles.notificationActions}>
                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="card">
              <h2 className={styles.sectionTitle}>Security Settings</h2>
              <div className={styles.securityContent}>
                <div className={styles.securitySection}>
                  <h3 className={styles.securitySectionTitle}>
                    Change Password
                  </h3>
                  <div className={styles.passwordForm}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Current Password</label>
                      <input type="password" className="input" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>New Password</label>
                      <input type="password" className="input" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Confirm New Password
                      </label>
                      <input type="password" className="input" />
                    </div>
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>

                <div className={styles.securityDivider}></div>

                <div className={styles.securitySection}>
                  <h3 className={styles.securitySectionTitle}>
                    Two-Factor Authentication
                  </h3>
                  <p className={styles.securityDescription}>
                    Add an extra layer of security to your account.
                  </p>
                  <button className="btn btn-secondary">Enable 2FA</button>
                </div>

                <div className={styles.securityDivider}></div>

                <div className={styles.securitySection}>
                  <h3 className={styles.dangerTitle}>Danger Zone</h3>
                  <div className={styles.dangerItem}>
                    <div className={styles.dangerInfo}>
                      <p className={styles.dangerName}>Delete Account</p>
                      <p className={styles.dangerDescription}>
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <button className="btn btn-danger">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
