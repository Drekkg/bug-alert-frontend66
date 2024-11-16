import React from "react";
import styles from "../styles/RotatingBadge.module.css";
function LoadingBadge() {
  return (
    <div>
      <span>Loading...</span>
      <i className={`fa-solid fa-crosshairs ${styles.loadingBadge}`} aria-hidden="true"></i>
    </div>
  );
}

export default LoadingBadge;
