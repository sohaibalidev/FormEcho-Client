// src/components/LoadingSpinner/index.jsx
import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = styles[size] || styles.md;

  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;
