"use client";
import { SWRConfig } from "swr";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
