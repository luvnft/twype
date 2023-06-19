import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const useAuth = () => {
  const { address, isConnected, isDisconnected, status } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      connector: new InjectedConnector(),
    });

  const { disconnect } = useDisconnect();

  // status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'

  return {
    address,
    isConnected,
    isDisconnected,
    ensName,
    connect,
    disconnect,
    status,
    connectors,
    error,
    isLoading,
    pendingConnector,
  };
};
