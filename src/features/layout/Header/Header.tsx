import { FC } from "react";
import { Link } from "react-router-dom";
// import cn from "classnames";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Nav } from "../Nav/Nav";
import { Avatar } from "@/ui/Avatar/Avatar";
import { Button } from "@/features/form/Button/Button";
import styles from "./Header.module.scss";

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { address, isConnected, ensName, connect, disconnect, status } =
    useAuth();
  console.log("🚀 ~ status:", status);

  const user = {
    photoUrl: `${
      import.meta.env.VITE_SITE_URL || "https://twype.com"
    }/user/user-photo.jpg`,
    balance: 14.2,
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.name}>Twype</span>
        <span className={styles.domain}>.com</span>
      </Link>

      <Nav />

      <div className={styles.auth}>
        {isConnected ? (
          <div className={styles.user}>
            {/* <span
                className={cn(
                  styles.balance,
                  user?.balance > 10 ? styles.positive : styles.negative
                )}
              >
                ${user.balance}
              </span> */}
            <button className={styles.logout} onClick={() => disconnect()}>
              <Avatar photoUrl={user.photoUrl} />
            </button>
          </div>
        ) : (
          <div>
            <Button onClick={() => connect()}>Sign In</Button>
          </div>
        )}
      </div>
    </header>
  );
};
