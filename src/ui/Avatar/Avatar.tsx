import { FC } from "react";
import cn from "classnames";
import styles from "./Avatar.module.scss";

export type AvatarProps = {
  photoUrl?: string;
};

export const Avatar: FC<AvatarProps> = ({ photoUrl }) => {
  return (
    <div className={styles.avatar}>
      {photoUrl ? (
        <img src={photoUrl} className={cn(styles.photo)} alt="" />
      ) : (
        <span className={styles.placeholder}></span>
      )}
    </div>
  );
};
