"use client";

import { motion } from "framer-motion";
import Slides from "./Slides";

const SlideShow = () => {
  return (
    <section
      className="w-full text-white bg-zinc-950 flex flex-col items-center pt-32 pb-40 
                      bg-[url('/background/pumpkin.png')] bg-cover bg-fixed bg-no-repeat overflow-hidden relative"
    >
      {/* Handmade Sticker */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
        className="absolute top-[30%] left-[5%] z-10 bg-red-800/90 rounded-full lg:w-32 lg:h-32 w-24 h-24
                   flex items-center justify-center transform rotate-12 shadow-lg 
                   border-4 border-dashed border-red-200"
      >
        <div className="text-center transform -rotate-12">
          <span className="font-semibold text-sm lg:text-lg text-white block">
            100%
          </span>
          <span className="font-semibold  text-sm lg:text-lg text-white block">
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
        <h1 className="md:text-4xl text-xl font-bold px-4 flex flex-wrap items-center justify-center gap-2 md:gap-x-3">
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
