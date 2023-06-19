import { FC, PropsWithChildren } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/features/form/Button/Button";
import styles from "./AuthProtector.module.scss";

type AuthProtectorProps = {};

export const AuthProtector: FC<PropsWithChildren<AuthProtectorProps>> = ({
  children,
}) => {
  const { isConnected, connect, status } = useAuth();

  if (status === "connecting" || status === "reconnecting") {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div className={styles.signIn}>
        <h1>Please, Sign In</h1>
        <div>
          <Button onClick={() => connect()}>Sign In</Button>
        </div>
      </div>
    );
  }

  return children;
};
