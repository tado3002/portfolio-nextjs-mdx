import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = "_tdh.schwarzen | Full-Stack Web Developer";

const description =
  "Skilled full-stack web developer in Pasuruan. I build responsive, user-friendly websites with React, NextJS, and NodeJS. Let's bring your vision to life. Hire me today!";

const url = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title,
  description,
  category: "technology",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "_tdh.schwarzen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.className}`}>
        <header>
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
