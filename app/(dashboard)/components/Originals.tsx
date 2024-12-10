"use client";
import { motion } from "framer-motion";
import Slides from "./Slides";
import { useState } from "react";
import Spin from "@/components/Spin";

const Originals = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSlideShowLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  return (
    <section className="w-full min-h-[95vh] max-h-screen text-white bg-gradient-to-b from-zinc-950 via-red-950/10 to-zinc-950 flex flex-col items-center pt-16 md:pt-24 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-red-950/10 to-zinc-950" />
      {/* <div className="absolute inset-0 bg-[url('/background/pumpkin.png')] bg-cover bg-fixed opacity-10 pointer-events-none mix-blend-normal" /> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-10 md:mb-16 w-full max-w-7xl mx-auto px-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4 flex flex-wrap items-center justify-center gap-2 md:gap-x-3">
          <span>Check out our</span>
          <motion.span
            className="font-nosifer text-red-600 inline-block drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            animate={{
              scale: [1, 1.1, 0.9, 1.1, 1],
              rotate: [0, -3, 3, -2, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            spooky
          </motion.span>
          <span>originals</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-4 md:mt-6 max-w-2xl mx-auto px-4">
          Available for purchase in our store
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-[1px] max-w-[100px] mx-auto mt-6 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
        />
      </motion.div>
      <div className="w-full backdrop-blur-[0.05px]">
        <div className="w-full max-w-[1600px] mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -20 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.5,
            }}
            className="absolute -top-[5%] left-[5%] z-10 bg-gradient-to-br from-red-800 to-red-900 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-[0_0_25px_rgba(185,28,28,0.15)] border-1 border-red-900/5 backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-red-200/30 animate-[spin_30s_linear_infinite]" />
            <div className="text-center transform -rotate-12">
              <span className="font-bold text-xs md:text-sm text-white block drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                100%
              </span>
              <span className="font-bold text-xs md:text-sm text-white block drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                Handmade
              </span>
            </div>
          </motion.div>
          <Slides onLoad={handleSlideShowLoad} hideSpinner={!isLoading} />
        </div>
      </div>
    </section>
  );
};
export default Originals;
