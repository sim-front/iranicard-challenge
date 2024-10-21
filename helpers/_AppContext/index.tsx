import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  apiAllTickets,
  apiAllTicketsKey,
  apiAuthorized,
  apiAuthorizedKey,
  apiLogout,
  apiLogoutKey,
} from "../apiRoutes";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ModelTicket } from "@/types/apiTypes";

type _AppContextProps = {
  authedIn: boolean | null;
  tickets: ModelTicket[] | undefined;
  refetchTicket: () => void;
  logout: () => void;
  decideShowingPage: (data: any) => void;
};

export const _AppContext = createContext({} as _AppContextProps);

type Props = {
  children: ReactNode;
};

export const ProviderApp = (p: Props) => {
  const router = useRouter();

  const [authedIn, setAuthedIn] = useState<boolean | null>(null);
  const [tickets, setTickets] = useState<ModelTicket[] | undefined>(undefined);

  const {
    data: authData,
    error: authError,
    isLoading: isAuthLoading,
    refetch: refetchAuth,
  } = useQuery({
    queryKey: [apiAuthorizedKey],
    queryFn: () => apiAuthorized(),
    retry: 0,
  });

  const {
    data: ticketData,
    error: ticketError,
    isLoading: isTicketLoading,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: [apiAllTicketsKey],
    queryFn: () => apiAllTickets(),
    enabled: false,
  });

  const {
    data: logoutData,
    error: logoutError,
    isLoading: isLogoutLoading,
    refetch: refetchLogout,
  } = useQuery({
    queryKey: [apiLogoutKey],
    queryFn: () => apiLogout(),
    enabled: false,
  });

  const decideShowingPage = (data: any) => {
    if (data) {
      setAuthedIn(true);
      !router.asPath.startsWith("/panel") && router.push("/panel");
    } else {
      setAuthedIn(false);
      !router.asPath.startsWith("/login") && router.push("/login");
    }
  };

  const logout = async () => {
    await refetchLogout()
      // TODO handle possible errors
      .then((res) => {
        decideShowingPage(null);
      });
  };

  useEffect(() => {
    decideShowingPage(authData);
  }, [authData]);

  useEffect(() => {
    ticketData && setTickets(ticketData);
  }, [ticketData]);

  return (
    <_AppContext.Provider
      value={{
        authedIn,
        tickets,
        refetchTicket,
        logout,
        decideShowingPage,
      }}
    >
      {p.children}
    </_AppContext.Provider>
  );
};

export const useAppContext = () => useContext(_AppContext);
