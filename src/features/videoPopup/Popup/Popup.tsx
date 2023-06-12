import { FC, PropsWithChildren } from "react";
import styles from "./Popup.module.scss";

type PopupProps = {};

export const Popup: FC<PropsWithChildren<PopupProps>> = ({ children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>{children}</div>
    </div>
  );
};
