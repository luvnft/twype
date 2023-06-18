import { useCallback, useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
import { getAccessToken, getMessage } from "@huddle01/auth";

export const useAccessToken = (address: string) => {
  const [accessToken, setAccessToken] = useState<string>("");

  const { signMessage } = useSignMessage({
    onSuccess: async (data) => {
      const token = await getAccessToken(data, address as string);
      setAccessToken(token.accessToken);
    },
  });

  const callMessage = useCallback(async () => {
    const msg = await getMessage(address);
    signMessage({ message: msg.message });
  }, []);

  useEffect(() => {
    callMessage();
  }, []);

  return {
    accessToken,
  };
};
