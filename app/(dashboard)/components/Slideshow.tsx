"use client";

import { motion } from "framer-motion";
import Slides from "./Slides";
import { Slide } from "@/types";

interface SlideShowProps {
  slides: Slide[];
}

const SlideShow = ({ slides }: SlideShowProps) => {
  return (
    <section className="w-full h-full text-white bg-zinc-950 flex flex-col items-center py-20 gap-y-5 bg-[url('/background/pumpkin.png')] bg-cover bg-no-repeat overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 100, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className="flex justify-center text-center items-center gap-x-8"
      >
        <h1 className="md:text-2xl text-xl font-semibold dark:text-white text-center px-12 sm:px-4">
          Check out our <span className="font-nosifer"> spooky </span> originals
          available for purchase
        </h1>
      </motion.div>
      <Slides slides={slides} />
    </section>
  );
};

export default SlideShow;
