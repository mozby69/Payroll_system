// app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import ClientProviders from "./CleintProviders";
import "@/public/css/reset.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Main App",
  description: "Main layout",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
