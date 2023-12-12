"use client";

import { Ghost, ShirtIcon } from "lucide-react";

import { motion } from "framer-motion";
import Slides from "./Slides";

const SlideShow = () => {
  return (
    <section className="w-full h-full bg-[#F6F1EE] dark:bg-zinc-950 flex flex-col items-center pt-12 pb-20 gap-y-5 bg-[url('/background/pumpkin.png')] bg-cover bg-no-repeat overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 100, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className="flex justify-center text-center items-center gap-x-8"
      >
        <h1 className="text-4xl font-semibold dark:text-white">
          Check out our <span className="font-nosifer"> spooky </span> designs
        </h1>
      </motion.div>
      <Slides />
    </section>
  );
};

export default SlideShow;
