"use client"
import "./globals.css";

import { AuthContext, AuthProvider } from "@/components/context/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>  {children}</AuthProvider>

      </body>
    </html>
  );
}
