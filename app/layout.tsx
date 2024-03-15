import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterProvider from "./providers/toaster-provider";
import AuthProvider from "./providers/auth-provider";
import ActiveStatus from "./components/active-status";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToasterProvider />
          <ActiveStatus />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
