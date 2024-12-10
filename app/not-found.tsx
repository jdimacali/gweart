"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { creepster } from "@/lib/fonts";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure fonts are loaded before showing content
    document.fonts.ready.then(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-purple-950/20 to-zinc-950 flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6"
        >
          <h1
            className={`text-8xl ${creepster.className} text-purple-300 mb-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]`}
          >
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like this page has vanished into the shadows. Don&apos;t
            worry, you can find your way back home.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-purple-600/20 hover:bg-purple-600/30 
                         text-purple-300 rounded-lg transition-all duration-300
                         border border-purple-500/30 hover:border-purple-500/50"
            >
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
