import React from "react";
import style from "./Logo.module.scss";
import { APP_TITLE, LOGO_ALT } from "../../utils/constants/LogoConstants";
const Logo = () => (
  <div className={style.logoContainer}>
    <img src="/img/logo.svg" className="logo" alt={LOGO_ALT} />
    <h1>{APP_TITLE}</h1>
  </div>
);
export default Logo;
