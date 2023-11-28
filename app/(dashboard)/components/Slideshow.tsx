"use client";

import { ShirtIcon } from "lucide-react";

import { motion } from "framer-motion";
import Slides from "./Slides";

const SlideShow = () => {
  return (
    <section className="w-full h-full bg-black flex flex-col items-center pt-12 pb-20 gap-y-5">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 100, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className="flex justify-center text-center items-center gap-x-8"
      >
        <h1 className="text-white text-4xl font-semibold">
          Check Out Our Merch
        </h1>
        <ShirtIcon height={30} width={30} color="white" />
      </motion.div>
      <Slides />
    </section>
  );
};

export default SlideShow;
