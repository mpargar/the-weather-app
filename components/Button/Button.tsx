import React from "react";
import styles from "./Button.module.scss";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
export interface IButton {
  children: React.ReactNode;
  styleType: "primary" | "accent";
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  styleType = "primary",
  onClick = () => {},
  style = {},
  type,
  disabled = false,
  loading = false,
}: IButton) => {
  return (
    <button
      data-testid="custom-button"
      className={`${styles.button} ${styles[styleType]}`}
      onClick={onClick}
      style={style}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <LoadingIcon /> : children}
    </button>
  );
};

export default Button;
