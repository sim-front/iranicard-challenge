import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiAuthorized, apiAuthorizedKey } from "../apiRoutes";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

type _AppContextProps = {
  authedIn: boolean | null;
};

export const _AppContext = createContext({} as _AppContextProps);

type Props = {
  children: ReactNode;
};

export const ProviderApp = (p: Props) => {
  const router = useRouter();

  const [authedIn, setAuthedIn] = useState<boolean | null>(null);

  const {
    data: authData,
    error: authError,
    isLoading: isAuthLoading,
  } = useQuery({
    queryKey: [apiAuthorizedKey],
    queryFn: () => apiAuthorized(),
  });

  useEffect(() => {
    if (!isAuthLoading) {
      if (authData) {
        setAuthedIn(true);
        !router.asPath.startsWith("/panel") && router.push("/panel");
      } else {
        setAuthedIn(false);
        !router.asPath.startsWith("/login") && router.push("/login");
      }
    }
  }, [isAuthLoading]);

  return (
    <_AppContext.Provider
      value={{
        authedIn,
      }}
    >
      {p.children}
    </_AppContext.Provider>
  );
};

export const useAppContext = () => useContext(_AppContext);
