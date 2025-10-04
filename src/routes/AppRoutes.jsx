import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";

import Landing from "../pages/Landing";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import ApiManagement from "../pages/ApiManagement";
import Messages from "../pages/Messages";
import Account from "../pages/Account";
import Admin from "../pages/Admin";

import ProtectedRoute from "./ProtectedRoute";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/api-keys", element: <ApiManagement /> },
  { path: "/messages", element: <Messages /> },
  { path: "/account", element: <Account /> },
];

const AppRoutes = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <Layout requireAdmin>
                <Admin />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Landing />}
      />
      <Route
        path="/auth"
        element={user ? <Navigate to="/dashboard" /> : <Auth />}
      />

      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Layout>{element}</Layout>
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
