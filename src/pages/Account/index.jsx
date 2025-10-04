import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/contexts/ApiContext";
import {
  AccountHeader,
  AccountContent,
} from "./components/AccountLayout/AccountLayout";
import { SidebarNavigation } from "./components/SidebarNavigation/SidebarNavigation";
import { ProfileTab } from "./components/ProfileTab/ProfileTab";
import { SubscriptionTab } from "./components/SubscriptionTab/SubscriptionTab";
import { NotificationsTab } from "./components/NotificationsTab/NotificationsTab";
import { SecurityTab } from "./components/SecurityTab/SecurityTab";
import styles from "./Account.module.css";

const Account = () => {
  const { user } = useAuth();
  const { getStats } = useApi();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    getStats();
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "subscription":
        return <SubscriptionTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className={styles.container}>
      <AccountHeader
        title="Account Settings"
        subtitle="Manage your account and subscription"
      />

      <AccountContent
        sidebar={
          <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        }
        main={renderActiveTab()}
      />
    </div>
  );
};

export default Account;
