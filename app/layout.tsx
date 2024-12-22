import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import {
  butcherman,
  creepster,
  dokdo,
  lato,
  metalMania,
  nosifer,
} from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Gweart",
  description: "Art by G.W.E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClasses = [
    lato.className,
    butcherman.variable,
    creepster.variable,
    dokdo.variable,
    nosifer.variable,
    metalMania.variable,
  ].join(" ");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-black ${fontClasses}`} suppressHydrationWarning>
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
