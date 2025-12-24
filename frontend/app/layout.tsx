import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";
import AuthGuard from "@/components/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "NotesShare: Unlock Knowledge | AI-Powered Notes, Live Learning & Creator Platform",
  description:
    "The ultimate web platform for students and creators. Upload, explore, and master educational notes, PDFs, and resources. Features include AI assistance, live streaming, real-time chat, rewards, and creator donations.",
  keywords: [
    "NotesShare",
    "educational notes",
    "student resources",
    "creator platform",
    "AI learning",
    "study notes",
    "live streaming education",
    "PDF sharing",
    "knowledge sharing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
