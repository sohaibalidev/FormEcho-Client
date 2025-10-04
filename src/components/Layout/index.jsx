// src/components/Layout/index.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Home,
  Key,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
    <div className={styles.container}>
      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>FormEcho</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className={styles.closeButton}
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
              >
                <Icon size={18} className={styles.navIcon} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userTier}>{user?.tier} Plan</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={16} className={styles.logoutIcon} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Mobile header */}
        <header className={styles.mobileHeader}>
          <div className={styles.mobileHeaderContent}>
            <button
              onClick={() => setSidebarOpen(true)}
              className={styles.menuButton}
            >
              <Menu size={20} />
            </button>
            <h1 className={styles.mobileTitle}>FormEcho</h1>
            <div className={styles.placeholder}></div>
          </div>
        </header>

        {/* Page content */}
        <main className={styles.pageContent}>{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
