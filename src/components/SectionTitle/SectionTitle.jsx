// SectionTitle.jsx
import React from "react";
import styles from "./SectionTitle.module.css";

const SectionTitle = ({ title, subtitle, center = false }) => {
  return (
    <div className={`${styles.container} ${center ? styles.center : ""}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider}></div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
