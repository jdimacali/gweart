"use client";

import InstagramFeed from "./components/InstagramFeed";
import { motion } from "framer-motion";

export default function SocialPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-zinc-950 via-purple-950/20 to-zinc-950 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-creep text-purple-300 mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            Social Feed
          </h1>
          <p className="text-gray-400 text-lg">
            Stay connected with our latest creations and updates on{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text animate-gradient font-semibold">
              Instagram
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <InstagramFeed />
        </motion.div>
      </div>
    </section>
  );
}
