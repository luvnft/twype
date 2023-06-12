import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { Avatar } from "@/ui/Avatar/Avatar";
import styles from "./Header.module.scss";

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const user = {
    photoUrl: `${import.meta.env.VITE_SITE_URL}/user/user-photo.jpg`,
    balance: 14.2,
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.name}>Twipe</span>
        <span className={styles.domain}>.com</span>
      </Link>

      <div className={styles.user}>
        <span
          className={cn(
            styles.balance,
            user?.balance > 10 ? styles.positive : styles.negative
          )}
        >
          ${user.balance}
        </span>
        <Avatar photoUrl={user.photoUrl} />
      </div>
    </header>
  );
};
