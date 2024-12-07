"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full min-h-[60vh] py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-purple-950/20 to-zinc-900" />
      <div
        className="absolute inset-0 bg-[url('/background/bg3.png')] bg-cover bg-fixed opacity-5"
        style={{ backgroundPosition: "center" }}
      />

      {/* Content Container */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-y-14 gap-x-20 items-center justify-center">
          {/* Image Section */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src="/karen.webp"
                alt="Picture of the author"
                fill
                className="object-cover rounded-2xl shadow-2xl 
                         transition-all duration-500 
                         group-hover:scale-105 
                         group-hover:brightness-110"
                priority
              />
              {/* Decorative Border */}
              <div
                className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/20
                            group-hover:ring-purple-400/60 
                            group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]
                            transition-all duration-500"
              />
            </div>
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Image
                src="/icon/gwe.png"
                alt="Decorative ghost"
                width={80}
                height={80}
                className="opacity-20"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center text-center md:text-left gap-y-6 max-w-xl"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl font-semibold text-purple-300/90"
            >
              Specializing in the UnOrdinary
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-creep 
                       text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              I am Girl Wonder Extraordinaire
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-md md:text-lg text-gray-300/90 leading-relaxed"
            >
              Los Angeles based Mixed Media Artist crafting unique pieces that
              blend the extraordinary with the unconventional. Each creation
              tells a story of wonder and imagination.
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center md:justify-start mt-4"
            >
              {/* Add your social media links here */}
              {/* Example button */}
              <motion.a
                href="/art_gallery"
                className="px-6 py-2 bg-purple-600/20 hover:bg-purple-600/40 
                         rounded-full border border-purple-500/30 
                         transition-all duration-300
                         hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Gallery
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
