import { User, CreditCard, Bell, Shield } from "lucide-react";
import styles from "./SidebarNavigation.module.css";

const menuItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export const SidebarNavigation = ({ activeTab, onTabChange }) => (
  <nav className={styles.sidebarNav}>
    {menuItems.map((item) => {
      const Icon = item.icon;
      return (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`${styles.sidebarButton} ${
            activeTab === item.id ? styles.sidebarButtonActive : ""
          }`}
        >
          <Icon size={18} strokeWidth={2} className={styles.sidebarIcon} />
          {item.label}
        </button>
      );
    })}
  </nav>
);
