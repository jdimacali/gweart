"use client";
import { motion } from "framer-motion";
import Slides from "./Slides";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const Originals = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSlideShowLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  return (
    <section className="flex items-center w-full h-full text-white bg-gradient-to-t from-zinc-950 via-red-900/20 to-zinc-950 flex-col relative overflow-hidden py-24 lg:py-32">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20"
      >
        {/* Handmade Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: -20 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            delay: 0.5,
          }}
          className="absolute top-[125%] left-10 z-30 bg-gradient-to-br from-red-800 to-red-900 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-[0_0_25px_rgba(185,28,28,0.15)] border border-red-900/5 backdrop-blur-sm"
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
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div className="flex items-center justify-center flex-col">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex flex-wrap items-center justify-center">
                <span>Check out our</span>
                <motion.span
                  className="font-nosifer text-red-600 inline-block drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] mx-2"
                  animate={{
                    scale: [1, 1.1, 0.9, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  spooky
                </motion.span>
                <span>originals</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base mb-4 mt-2">
                Available for purchase in our store
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Slides Section */}
      <div className="w-full relative mt-10">
        <Slides onLoad={handleSlideShowLoad} hideSpinner={!isLoading} />
      </div>
      {/* Red line below slides */}
      <div className="w-full lg:w-[50%] h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent mt-8 blur-[1px] opacity-70" />
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=" max-w-sm lg:max-w-2xl text-gray-400/80 text-sm md:text-base mt-4 text-center"
        >
          Each piece is meticulously crafted with love and attention to detail,
          bringing a unique blend of spooky charm and artistic excellence to
          your collection. For custom orders, please email me through our contact us page.
        </motion.p>
        <motion.a
          href="/contact_us"
          className="mt-6 px-6 py-2 bg-red-600/20 hover:bg-red-600/40 
                           rounded-full border border-red-500/30 
                           transition-all duration-300 flex items-center gap-2
                           hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] text-white group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
};

export default Originals;
