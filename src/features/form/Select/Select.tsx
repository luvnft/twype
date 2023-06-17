import { ChangeEvent, FC } from "react";
import styles from "./Select.module.scss";

type SelectProps = {
  value?: string;
  options?: string[];
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  onChange: (value: string) => void;
};

export const Select: FC<SelectProps> = ({
  value,
  options = [],
  disabled,
  required,
  onChange,
}) => {
  return (
    <select
      value={value}
      required={required}
      disabled={disabled}
      className={styles.select}
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        onChange(event.target.value)
      }
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
