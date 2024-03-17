import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthProvider";
import {
  butcherman,
  creepster,
  dokdo,
  lato,
  metalMania,
  nosifer,
} from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Gweart",
  description: "Art by G.W.E",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` bg-black ${butcherman.variable} ${creepster.variable} ${dokdo.variable} ${nosifer.variable} ${lato.variable} ${metalMania.variable} ${lato.className}`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
