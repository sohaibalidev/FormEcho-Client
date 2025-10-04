import { useTheme } from "@/contexts/ThemeContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./AuthCard.module.css";

export const AuthCard = ({
  error,
  onRetry,
  scriptLoaded,
  isLoading,
  googleButtonRef,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.card} ${isDarkMode ? styles.dark : ""}`}>
        <div className={styles.cardHeader}>
          <h2
            className={`${styles.cardTitle} ${isDarkMode ? styles.dark : ""}`}
          >
            Sign In
          </h2>
          <p
            className={`${styles.cardSubtitle} ${
              isDarkMode ? styles.dark : ""
            }`}
          >
            Continue with your Google account
          </p>
        </div>

        {error && (
          <div className={`${styles.error} ${isDarkMode ? styles.dark : ""}`}>
            <div className={styles.errorContent}>
              <span>{error}</span>
              {error.includes("Failed to load") && (
                <button onClick={onRetry} className={styles.retryButton}>
                  Retry
                </button>
              )}
            </div>
          </div>
        )}

        <div className={styles.form}>
          <div ref={googleButtonRef} className={styles.googleButtonContainer}>
            {(!scriptLoaded || isLoading) && (
              <div
                className={`${styles.loadingState} ${
                  isDarkMode ? styles.dark : ""
                }`}
              >
                <LoadingSpinner size="sm" />
                <span className={styles.loadingText}>
                  {!scriptLoaded ? "Loading..." : "Signing in..."}
                </span>
              </div>
            )}
          </div>

          <div className={`${styles.divider} ${isDarkMode ? styles.dark : ""}`}>
            <span
              className={`${styles.dividerText} ${
                isDarkMode ? styles.dark : ""
              }`}
            >
              or
            </span>
          </div>

          <div className={styles.alternativeOptions}>
            <p
              className={`${styles.alternativeText} ${
                isDarkMode ? styles.dark : ""
              }`}
            >
              Having trouble?{" "}
              <a
                href="#contact-support"
                className={`${styles.supportLink} ${
                  isDarkMode ? styles.dark : ""
                }`}
              >
                Contact support
              </a>
            </p>
          </div>
        </div>

        <div className={`${styles.footer} ${isDarkMode ? styles.dark : ""}`}>
          <p
            className={`${styles.footerText} ${isDarkMode ? styles.dark : ""}`}
          >
            By continuing, you agree to our{" "}
            <a
              href="#terms"
              className={`${styles.footerLink} ${
                isDarkMode ? styles.dark : ""
              }`}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className={`${styles.footerLink} ${
                isDarkMode ? styles.dark : ""
              }`}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
