import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "../Sidebar";
import Header from "../Header";
import styles from "./Layout.module.css";

const Layout = ({ children, requireAdmin: noSidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  if (noSidebar) return children;

  return (
    <div className={styles.container}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        user={user}
        onLogout={handleLogout}
      />

      <div className={styles.mainContent}>
        <Header onMenuClick={handleMenuClick} />

        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
