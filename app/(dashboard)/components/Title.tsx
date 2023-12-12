"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TitleProps {
  title: string;
  subtitle: string;
  button: string;
}

const Title = ({ title, subtitle, button }: TitleProps) => {
  const router = useRouter();
  return (
    <div className="max-sm:mb-4">
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{
          ease: "backOut",
          duration: 1,
        }}
        style={{ textShadow: "2px 3px  #d4d4d4" }}
        className=" break-words text-7xl tracking-[0.35rem] font-bold dark:text-[#8b46c4] font-mania antialiased drop-shadow-2xl underline-offset-[13px] underline decoration-from-font"
      >
        {title}
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{
          ease: "backOut",
          duration: 1,
        }}
        className="text-3xl tracking-[0.30rem] font-bold text-[#ffffff] font-mania antialiased mt-5 text-shadow-black dark:text-shadow-purple"
      >
        {subtitle}
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
          <h3 className="text-lg text-white m-3"> {button} </h3>
        </Button>
      </motion.div>
    </div>
  );
};
export default Title;
