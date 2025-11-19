"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: true,
        errorRetryInterval: 3000,
        errorRetryCount: 5,
      }}
    >
      {children}
    </SWRConfig>
  );
}
