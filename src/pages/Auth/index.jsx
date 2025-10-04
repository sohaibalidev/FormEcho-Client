import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { AuthHeader } from "./components/AuthHeader/AuthHeader";
import { AuthCard } from "./components/AuthCard/AuthCard";
import styles from "./Auth.module.css";

const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-client-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-client-script";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const googleButtonRef = useRef(null);
  const { loginWithGoogle, error, setError } = useAuth();
  const { isDarkMode } = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    const initGoogle = async () => {
      try {
        await loadGoogleScript();
        setScriptLoaded(true);
      } catch (error) {
        console.error("Failed to load Google script:", error);
        setError("Failed to load authentication service. Please try again.");
      }
    };

    initGoogle();

    return () => {
      if (googleButtonRef.current) {
        googleButtonRef.current.innerHTML = "";
      }
    };
  }, [setError]);

  useEffect(() => {
    if (scriptLoaded && window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: "popup",
        auto_select: false,
      });

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: isDarkMode ? "filled_black" : "filled_blue",
        size: "large",
        shape: "rectangular",
        width: "100%",
        text: "signin_with",
        logo_alignment: "center",
      });
    }
  }, [scriptLoaded, isDarkMode]);

  const handleGoogleResponse = async (response) => {
    setIsLoading(true);
    setError("");
    try {
      await loginWithGoogle(response.credential);
      navigate("/dashboard");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setScriptLoaded(false);
    setTimeout(() => {
      loadGoogleScript().then(() => setScriptLoaded(true));
    }, 1000);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <ThemeToggle />

      <AuthHeader isDarkMode={isDarkMode} />

      <AuthCard
        isDarkMode={isDarkMode}
        error={error}
        onRetry={handleRetry}
        scriptLoaded={scriptLoaded}
        isLoading={isLoading}
        googleButtonRef={googleButtonRef}
      />
    </div>
  );
};

export default Auth;
