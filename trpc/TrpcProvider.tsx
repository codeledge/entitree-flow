"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";
import React, { useState } from "react";
import { trpcReact } from "./trpcReact";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [
        loggerLink({
          enabled: () => false,
        }),
        httpBatchLink({
          url: "/api/trpc",
          fetch: async (input, options) => {
            const fetch = getFetch();
            return fetch(input, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcReact.Provider>
  );
}
