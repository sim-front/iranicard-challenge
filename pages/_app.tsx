import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProviderApp } from "@/helpers/_AppContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderApp>
        <Component {...pageProps} />;
      </ProviderApp>
    </QueryClientProvider>
  );
}
