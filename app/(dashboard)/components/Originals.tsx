"use client";

import { motion } from "framer-motion";
import Slides from "./Slides";

const SlideShow = () => {
  return (
    <section
      className="w-full text-white bg-zinc-950 flex flex-col items-center pt-32 pb-40 
                      bg-[url('/background/pumpkin.png')] bg-cover bg-no-repeat overflow-hidden relative"
    >
      {/* Handmade Sticker */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -20 }}
        transition={{
          type: "spring",
          stiffness: 180, // Reduced stiffness for a smoother effect
          damping: 50, // Increased damping for a slower effect
          delay: 1,
          ease: "easeOut", // Added ease for smoother transition
        }}
        className="absolute top-[35%] left-[5%] z-10 bg-gradient-to-br from-red-800 to-red-900
             rounded-full lg:w-32 lg:h-32 w-24 h-24 flex items-center justify-center 
             transform rotate-12 shadow-[0_0_15px_rgba(0,0,0,0.3)]
             border-4 border-red-200/20 backdrop-blur-sm"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)]" />
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-red-200/30 animate-[spin_30s_linear_infinite]" />
        <div className="text-center transform -rotate-12">
          <span className="font-bold text-xs lg:text-lg text-white block drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            100%
          </span>
          <span className="font-bold text-xs lg:text-lg text-white block drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Handmade
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.8 }}
        className="flex flex-col justify-center text-center items-center gap-y-4 mb-4"
      >
        <h1 className="text-2xl md:text-4xl font-bold px-4 flex flex-wrap items-center justify-center gap-2 md:gap-x-3">
          <span>Check</span>
          <span>out</span>
          <span>our</span>
          <motion.span
            className="font-nosifer text-red-700 inline-block"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, -5, 5, -3, 0],
              x: [0, 2, -2, 1, 0],
              y: [0, -2, 2, -1, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              rotate: [-5, 5, -5, 5, 0],
              transition: { duration: 0.3 },
            }}
          >
            spooky
          </motion.span>
          <span>originals</span>
        </h1>
        <p className="text-gray-400 md:text-lg text-base max-w-2xl px-4">
          Available for purchase in our store
        </p>
      </motion.div>
      <Slides />
    </section>
  );
};

export default SlideShow;
