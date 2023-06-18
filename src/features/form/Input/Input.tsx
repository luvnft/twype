import { ChangeEvent, FC } from "react";
import styles from "./Input.module.scss";

export enum InputNativeType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
}

type InputProps = {
  value?: string;
  placeholder?: string;
  type?: InputNativeType;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  onChange: (value: string) => void;
};

export const Input: FC<InputProps> = ({
  value,
  placeholder,
  type = "text",
  disabled,
  required,
  readOnly,
  onChange,
}) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      className={styles.input}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
    />
  );
};
