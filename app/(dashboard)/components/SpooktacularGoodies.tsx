"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SpooktacularGoodies = () => {
  const router = useRouter();
  return (
    <section
      className={
        "w-full min-h-[850px] bg-violet-950 shadow-2xl flex max-sm:flex-col justify-center text-center items-center gap-x-20 p-10 relative bg-gradient-to-br from-violet-900 from-15% to-violet-950  to-5% "
      }
    >
      <div className="vector absolute left-[0px] top-[-10px]">
        <svg viewBox="0 0 600 250" preserveAspectRatio="none">
          <line x1="1" y1="1" x2="700" y2="1" id="top" />
          <line x1="1" y1="1" x2="1" y2="250" />
          <line x1="1" y1="1" x2="450" y2="250" />
          <line x1="1" y1="1" x2="175" y2="250" />
          <path d="M 1,80 a 12,15 45 1,1 37,-26 a 10,12 0 1,1 14,-24 a 25,20 -45 1,1 40,-30" />
          <path d="M 1,160 a 17,20 45 1,1 75,-52 a 17,20 0 1,1 30,-48 a 30,25 -45 1,1 60,-70" />
          <path d="M 1,240 a 22,25 45 1,1 113,-78 a 23,26 0 1,1 46,-72 a 35,30 -45 1,1 90,-110" />
        </svg>
      </div>
      <div>
        <motion.h2
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{
            ease: "backOut",
            duration: 1,
          }}
          style={{ textShadow: "2px 3px  #d4d4d4" }}
          className="text-7xl tracking-[0.35rem] font-bold text-[#8b46c4] font-mania antialiased drop-shadow-2xl underline-offset-[13px] underline decoration-from-font"
        >
          Spooktacular Goodies
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{
            ease: "anticipate",
            duration: 1,
            delay: 0.25,
          }}
        >
          <Button
            onClick={() => router.push("/shop")}
            className="bg-gray-950 p-6 rounded-xl max-sm:w-[90vw] transition-all hover:bg-gray-900 hover:opacity-80 mt-8"
          >
            <h3 className="text-lg text-white m-3"> Shop Now </h3>
          </Button>
        </motion.div>
      </div>
      <div className=" drop-shadow-2xl">
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 100, 0] }}
          transition={{
            delay: 0,
            duration: 5,
            repeat: Infinity,
            repeatDelay: 10,
            ease: "backIn",
          }}
        >
          <Image
            src="/mex/mex1.png"
            width={600}
            height={600}
            alt="cholagif"
            className="object-contain absolute"
          />
        </motion.div> */}
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
            src="/mex/mex4.png"
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
            src="/mex/mex3.png"
            width={600}
            height={600}
            alt="cholagif"
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};
export default SpooktacularGoodies;
