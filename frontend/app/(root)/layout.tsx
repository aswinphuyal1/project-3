import type { Metadata } from "next";
// Assuming Geist and Geist_Mono are correctly imported or defined
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

// Assuming these fonts are correctly defined/available
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. Better, keyword-rich title
  title:
    "NotesShare: Unlock Knowledge | AI-Powered Notes, Live Learning & Creator Platform",

  // 2. Descriptive, keyword-rich description mentioning core features
  description:
    "The ultimate web platform for students and creators. Upload, explore, and master educational notes, PDFs, and resources. Features include AI assistance, live streaming, real-time chat, rewards, and creator donations.",

  // 3. Add keywords (optional but helpful)
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
        {children}
      </body>
    </html>
  );
}
