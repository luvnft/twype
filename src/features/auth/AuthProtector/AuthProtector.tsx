import { FC, PropsWithChildren } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import styles from "./AuthProtector.module.scss";

type AuthProtectorProps = {};

export const AuthProtector: FC<PropsWithChildren<AuthProtectorProps>> = ({
  children,
}) => {
  const { auth, authLoading, isLoggedIn, isAuthLoading } = useAuth();

  if (authLoading || isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.signIn}>
        <h1>Please, Sign In</h1>
        <div>
          <button onClick={() => auth.signIn()}>Sign In</button>
        </div>
      </div>
    );
  }

  return children;
};
