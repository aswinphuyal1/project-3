"use client";
import { AdminProvider } from "@/context/AdminContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
