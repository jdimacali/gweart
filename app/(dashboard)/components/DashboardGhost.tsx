"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const DashboardGhost = () => {
  const ghostVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="hidden md:block">
      {/* Top right ghost */}
      <motion.div
        className="absolute top-[10%] left-[80%] cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0],
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        whileHover="hover"
        variants={ghostVariants}
      >
        <Image
          src="/ghost.png"
          width={120}
          height={120}
          alt="ghost"
          className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
      </motion.div>

      {/* Bottom left ghost */}
      <motion.div
        className="absolute bottom-[20%] left-[15%] cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.5, 0],
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
          delay: 2,
        }}
        whileHover="hover"
        variants={ghostVariants}
      >
        <Image
          src="/ghost.png"
          width={100}
          height={100}
          alt="ghost"
          className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transform -scale-x-100"
        />
      </motion.div>

      {/* Center ghost */}
      <motion.div
        className="absolute top-[5%] left-[50%] -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0],
          y: [0, -40, 0],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1,
        }}
        whileHover="hover"
        variants={ghostVariants}
      >
        <Image
          src="/ghost.png"
          width={150}
          height={150}
          alt="ghost"
          className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        />
      </motion.div>
    </div>
  );
};

export default DashboardGhost;
