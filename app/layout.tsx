import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "@/components/ui/toaster";
import {
  butcherman,
  creepster,
  dokdo,
  metalMania,
  openSans,
  nosifer,
} from "@/lib/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Gweart",
  description: "Art by G.W.E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` bg-black ${butcherman.variable} ${creepster.variable} ${dokdo.variable} ${nosifer.variable} ${openSans.variable} ${metalMania.variable} ${openSans.className}`}
        suppressHydrationWarning
      >
        <SpeedInsights />
        <Analytics />
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
