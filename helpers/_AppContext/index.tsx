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
} from "../apiRoutes";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ModelTicket } from "@/types/apiTypes";

type _AppContextProps = {
  authedIn: boolean | null;
  tickets: ModelTicket[] | undefined;
  refetchTicket: () => void;
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
  } = useQuery({
    queryKey: [apiAuthorizedKey],
    queryFn: () => apiAuthorized(),
  });

  const {
    data: ticketData,
    error: ticketError,
    isLoading: isTicketLoading,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: [apiAllTicketsKey],
    queryFn: () => apiAllTickets(),
    retry: 0,
  });

  const decideShowingPage = () => {
    if (!isAuthLoading) {
      if (authData) {
        setAuthedIn(true);
        !router.asPath.startsWith("/panel") && router.push("/panel");
      } else {
        setAuthedIn(false);
        !router.asPath.startsWith("/login") && router.push("/login");
      }
    }
  };

  useEffect(() => {
    decideShowingPage();
  }, [isAuthLoading]);

  useEffect(() => {
    ticketData && setTickets(ticketData);
  }, [ticketData]);

  return (
    <_AppContext.Provider
      value={{
        authedIn,
        tickets,
        refetchTicket,
      }}
    >
      {p.children}
    </_AppContext.Provider>
  );
};

export const useAppContext = () => useContext(_AppContext);
