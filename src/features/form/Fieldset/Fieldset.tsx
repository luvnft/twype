import { FC, PropsWithChildren } from "react";
import styles from "./Fieldset.module.scss";

type FieldsetProps = {
  label?: string;
  isRequired?: boolean;
};

export const Fieldset: FC<PropsWithChildren<FieldsetProps>> = ({
  children,
  label,
  isRequired,
}) => {
  return (
    <div className={styles.fieldset}>
      <div className={styles.label}>
        {label}
        {isRequired && label && <b className={styles.required}>*</b>}
      </div>
      <div className={styles.slot}>{children}</div>
    </div>
  );
};
