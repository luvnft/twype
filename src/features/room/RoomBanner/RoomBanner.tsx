import { FC, PropsWithChildren } from "react";

import { Link } from "react-router-dom";
import { Button } from "@/features/form/Button/Button";
import styles from "./RoomBanner.module.scss";

type RoomBannerProps = {
  to: string;
  title?: string;
  posterUrl?: string;
};

export const RoomBanner: FC<PropsWithChildren<RoomBannerProps>> = ({
  children,
  to,
  title,
  posterUrl,
}) => {
  return (
    <Link to={to} className={styles.banner}>
      {posterUrl && <img src={posterUrl} alt="" className={styles.poster} />}
      {title && <div className={styles.title}>{title}</div>}
      {children && <div>{children}</div>}
    </Link>
  );
};
