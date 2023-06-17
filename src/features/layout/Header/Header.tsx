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
  const { auth, authLoading, isLoggedIn, isAuthLoading } = useAuth();

  const user = {
    photoUrl: `${
      import.meta.env.VITE_SITE_URL || "https://twype.com"
    }/user/user-photo.jpg`,
    balance: 14.2,
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.name}>Twipe</span>
        <span className={styles.domain}>.com</span>
      </Link>

      <Nav />

      {!authLoading && !isAuthLoading && (
        <div className={styles.auth}>
          {isLoggedIn ? (
            <div className={styles.user}>
              {/* <span
                className={cn(
                  styles.balance,
                  user?.balance > 10 ? styles.positive : styles.negative
                )}
              >
                ${user.balance}
              </span> */}
              <button className={styles.logout} onClick={() => auth.signOut()}>
                <Avatar photoUrl={user.photoUrl} />
              </button>
            </div>
          ) : (
            <div>
              <Button onClick={() => auth.signIn()}>Sign In</Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
