"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import ClientOnlyLayout from "./ClientOnlyLayout";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <ReactQueryProvider>
      {isLoginPage ? (
        children
      ) : (
        <ClientOnlyLayout>{children}</ClientOnlyLayout>
      )}
    </ReactQueryProvider>
  );
}
