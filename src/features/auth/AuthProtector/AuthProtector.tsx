import { FC, PropsWithChildren } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/features/form/Button/Button";
import styles from "./AuthProtector.module.scss";

type AuthProtectorProps = {};

export const AuthProtector: FC<PropsWithChildren<AuthProtectorProps>> = ({
  children,
}) => {
  const {
    isConnected,
    connect,
    status,
    connectors,
    error,
    isLoading,
    pendingConnector,
  } = useAuth();

  if (status === "connecting" || status === "reconnecting") {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div className={styles.signIn}>
        <h1>Please, Sign In</h1>
        <div>
          {/* <Button onClick={() => connect()}>Sign In</Button> */}

          {connectors.map((connector) => (
            <Button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </Button>
          ))}

          {error && <div>{error.message}</div>}
        </div>
      </div>
    );
  }

  return children;
};
