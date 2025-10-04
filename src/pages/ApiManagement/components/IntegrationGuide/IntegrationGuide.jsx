import styles from "./IntegrationGuide.module.css";

export const IntegrationGuide = () => {
  return (
    <div className={styles.integrationGuide}>
      <h3 className={styles.guideTitle}>Integration Guide</h3>
      <div className={styles.guideContent}>
        <p className={styles.guideText}>
          Add this script to your website to start receiving form submissions:
        </p>
        <pre className={styles.codeBlock}>
          {`<script>
  window.FormEchoConfig = {
    apiKey: 'YOUR_API_KEY_HERE'
  };
</script>
<script src="https://cdn.formecho.com/formecho.js"></script>`}
        </pre>
        <p className={styles.guideNote}>
          Your forms will automatically be intercepted and submissions will be
          sent to your email.
        </p>
      </div>
    </div>
  );
};
