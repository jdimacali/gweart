"use client";

import { ShirtIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const slides = [
  "/slideshow/slide1.jpg",
  "/slideshow/slide2.jpg",
  "/slideshow/slide3.jpg",
  "/slideshow/slide4.jpg",
];

const SlideShow = () => {
  return (
    <section className="w-full h-[600px] bg-black flex flex-col items-center pt-12 shadow-lg drop-shadow-xl">
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
      <div className="flex w-full h-full items-center justify-center gap-x-3">
        {slides.map((slide) => (
          <div key={slide} className="relative h-[400px] w-[300px]">
            <Image
              src={slide}
              fill
              quality={100}
              alt="slide1"
              className="object-fit"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlideShow;
