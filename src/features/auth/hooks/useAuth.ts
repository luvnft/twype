import {
  useAuth as usePolybaseAuth,
  useIsAuthenticated,
} from "@polybase/react";

export const useAuth = () => {
  const { auth, state: userData, loading: authLoading } = usePolybaseAuth();
  const [isLoggedIn, loading] = useIsAuthenticated();

  return {
    auth,
    authLoading,
    userData,
    isLoggedIn,
    isAuthLoading: loading,
  };
};
