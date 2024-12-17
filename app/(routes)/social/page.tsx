"use client";

import InstagramFeed from "./components/InstagramFeed";
import { motion } from "framer-motion";

export default function SocialPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-zinc-950 via-purple-950/10 to-zinc-950 py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h1
            className="text-4xl md:text-5xl font-creep text-purple-400 mb-4 
                         drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            Social Feed
          </h1>
          <p className="text-zinc-400 text-lg">
            Stay connected with our latest creations and updates on{" "}
            <span
              className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 
                           text-transparent bg-clip-text animate-gradient font-semibold"
            >
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
