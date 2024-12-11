"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SocialPage = () => {
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
            Stay connected with our latest creations and updates
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-zinc-800/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20 max-w-md w-full text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <Image
                src="/icon/gwe.png"
                alt="GWE Logo"
                fill
                className="object-contain opacity-50"
              />
            </div>
            <h2 className="text-2xl font-creep text-purple-300 mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-400">
              Our social feed is currently under construction. Check back soon
              to see our latest Instagram updates!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialPage;
