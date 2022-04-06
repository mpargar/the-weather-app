import React, { ChangeEvent } from "react";
import styles from "./Input.module.scss";
export interface IInputProps {
  id: string;
  value: string | number;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  disabled?: boolean;
  postponeComponent?: React.ReactNode;
  autoComplete?: "off" | "on" | undefined;
  message?: string;
  min?: number;
  max?: number;
}
const Input = ({
  id,
  value,
  onChange = () => {},
  placeholder = "",
  type = "text",
  disabled = false,
  postponeComponent,
  autoComplete = "off",
  message = "",
  min,
  max,
}: IInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={value ? styles.active : ""} htmlFor={id} role="label">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        role="input"
      />
      {!!postponeComponent && (
        <div
          data-testid="postponeComponent"
          className={styles.postponeComponent}
        >
          {postponeComponent}
        </div>
      )}
      {!!message && (
        <div data-testid="message" className={styles.error}>
          {message}
        </div>
      )}
    </div>
  );
};
export default Input;
