import React from "react";
import styles from "./LoadingIcon.module.scss";
const LoadingIcon = () => {
  return (
    <img
      data-testid="custom-loading-icon"
      className={styles.rotate}
      src="/img/white-balance-sunny.svg"
      alt="Sun loading icon"
    />
  );
};
export default LoadingIcon;
