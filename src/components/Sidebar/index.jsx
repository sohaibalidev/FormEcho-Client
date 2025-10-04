import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Key,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose, user, onLogout }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "API Keys", href: "/api-keys", icon: Key },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Account", href: "/account", icon: Settings },
  ];

  if (user?.isSuperAdmin) {
    navigation.push({ name: "Admin", href: "/admin", icon: Users });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.logo}>FormEcho</h1>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <nav className={styles.nav}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${styles.navLink} ${
                    isActive(item.href) ? styles.navLinkActive : ""
                  }`}
                  onClick={onClose}
                >
                  <Icon size={18} className={styles.navIcon} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.themeToggleWrapper}>
              <button
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun size={18} className={styles.themeIcon} />
                ) : (
                  <Moon size={18} className={styles.themeIcon} />
                )}
                <span className={styles.themeText}>
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>

            <div className={styles.userInfo}>
              <p className={styles.userName}>{user?.name}</p>
              <p className={styles.userTier}>{user?.tier} Plan</p>
            </div>

            <button onClick={onLogout} className={styles.logoutButton}>
              <LogOut size={16} className={styles.logoutIcon} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
