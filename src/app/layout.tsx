"use client"
import "./globals.css";

import { AuthContext, AuthProvider } from "@/components/context/AuthProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>  {children}</AuthProvider>

      </body>
    </html>
  );
}
