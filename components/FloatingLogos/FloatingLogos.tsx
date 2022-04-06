import React from "react";
import styles from "./FloatingLogos.module.scss";
import {
  DISTILLERY_LOGO_ALT,
  INSIGHT2PROFIT_LOGO_ALT,
} from "../../utils/constants/FloatingLogos";
const FloatingLogos = () => (
  <div
    data-testid="floating-logos-container"
    className={styles.floatingLogosContainer}
  >
    <img src="/img/distillery.svg" className="logo" alt={DISTILLERY_LOGO_ALT} />
    <img
      src="/img/insight2profit.svg"
      className="logo"
      alt={INSIGHT2PROFIT_LOGO_ALT}
    />
  </div>
);

export default FloatingLogos;
