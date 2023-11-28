"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const DashboardImages = () => {
  return (
    <div className=" drop-shadow-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: [0, 100, 0], scale: 1 }}
        transition={{
          delay: 5,
          duration: 5,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeOut",
        }}
      >
        <Image
          src="/mex/mex3.png"
          width={600}
          height={600}
          alt="cholagif"
          className="object-contain absolute"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: [0, 100, 0], scale: 1 }}
        transition={{
          delay: 0,
          duration: 5,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeOut",
        }}
      >
        <Image
          src="/mex/mex1.png"
          width={600}
          height={600}
          alt="cholagif"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};
export default DashboardImages;
