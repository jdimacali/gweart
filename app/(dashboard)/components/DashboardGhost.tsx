"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const DashboardGhost = () => {
  return (
    <>
      <motion.div
        className="absolute top-[10%] left-[80%]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 100, 0],
          x: [0, 25, 0, 25, 0],
          y: [0, 25, 0],
          scale: [0.8, 1.2, 1, 1.2, 0.8],
          rotate: [0, 10, 0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 4,
          repeatDelay: 5,
        }}
      >
        <Image
          src="/mex/mex4.png"
          width={50}
          height={50}
          alt="cholagif"
          className="object-contain"
        />
      </motion.div>
      <motion.div
        className="absolute top-[70%] left-[20%] max-sm:hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 50, 80, 50, 0],
          x: [0, 25, 0],
          y: [0, 25, 0, -25, 0],
          scale: [0.8, 1.2, 1, 1.2, 0.8],
          rotate: [0, -10, 0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 3,
          repeatDelay: 4,
        }}
      >
        <Image
          src="/mex/mex4.png"
          width={50}
          height={50}
          alt="cholagif"
          className="object-contain"
        />
      </motion.div>
      <motion.div
        className="absolute top-[20%] left-[40%] max-sm:hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 50, 80, 50, 0],
          x: [0, 25, 0],
          y: [0, 25, 0, -25, 0],
          scale: [0.8, 1.2, 1, 1.2, 0.8],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 2,
          repeatDelay: 3,
        }}
      >
        <Image
          src="/mex/mex4.png"
          width={50}
          height={50}
          alt="cholagif"
          className="object-contain"
        />
      </motion.div>
      <motion.div
        className="absolute top-[80%] left-[90%] max-sm:hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 50, 80, 50, 0],
          x: [0, 25, 0, -25, 0],
          y: [0, -25, 0],
          scale: [0.5, 1.05, 1, 1.05, 0.95],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 1,
          repeatDelay: 6,
        }}
      >
        <Image
          src="/mex/mex4.png"
          width={50}
          height={50}
          alt="cholagif"
          className="object-contain"
        />
      </motion.div>
    </>
  );
};
export default DashboardGhost;
