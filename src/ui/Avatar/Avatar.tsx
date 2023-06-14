import { FC } from "react";
import cn from "classnames";
import ReactAvatar, { genConfig } from "react-nice-avatar";
import styles from "./Avatar.module.scss";

const avatarConfig = genConfig({ sex: "man", hairStyle: "mohawk" });

export type AvatarProps = {
  photoUrl?: string;
};

export const Avatar: FC<AvatarProps> = ({ photoUrl }) => {
  return (
    <div className={styles.avatar}>
      {photoUrl ? (
        <ReactAvatar className={styles.photo} {...avatarConfig} />
      ) : (
        <span className={styles.placeholder}></span>
      )}
    </div>
  );
};
