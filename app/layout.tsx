import React from "react"
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";

const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TALE 2.0 - Discover Your Partner's Love Style This Valentine's",
  description:
    "Take the 2-minute TALE quiz to discover your partner's top 2 Love Styles and unlock personalized Valentine gift ideas they'll truly love.",
};

export const viewport = {
  themeColor: "#dc264e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
