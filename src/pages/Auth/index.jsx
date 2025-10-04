import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Sun, Moon } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
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
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("is-dark"))
  );

  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);

    localStorage.setItem("is-dark", !isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

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
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun size={20} className={styles.themeIcon} />
        ) : (
          <Moon size={20} className={styles.themeIcon} />
        )}
      </button>

      <div className={styles.header}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <img
              src="/favicon.ico"
              alt="FormEcho"
              className={styles.logoImage}
            />
          </div>
        </Link>
        <h1 className={styles.title}>Welcome to FormEcho</h1>
        <p className={styles.subtitle}>
          Streamline your form submissions with ease
        </p>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Sign In</h2>
            <p className={styles.cardSubtitle}>
              Continue with your Google account
            </p>
          </div>

          {error && (
            <div className={styles.error}>
              <div className={styles.errorContent}>
                <span>{error}</span>
                {error.includes("Failed to load") && (
                  <button onClick={handleRetry} className={styles.retryButton}>
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}

          <div className={styles.form}>
            <div ref={googleButtonRef} className={styles.googleButtonContainer}>
              {(!scriptLoaded || isLoading) && (
                <div className={styles.loadingState}>
                  <LoadingSpinner size="sm" />
                  <span className={styles.loadingText}>
                    {!scriptLoaded ? "Loading..." : "Signing in..."}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            <div className={styles.alternativeOptions}>
              <p className={styles.alternativeText}>
                Having trouble?{" "}
                <a href="#contact-support" className={styles.supportLink}>
                  Contact support
                </a>
              </p>
            </div>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              By continuing, you agree to our{" "}
              <a href="#terms" className={styles.footerLink}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className={styles.footerLink}>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
