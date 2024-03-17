"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DisplayText } from "@/types";
import clsx from "clsx";
import { getFonts } from "@/lib/utils";

interface TitleProps {
  title: DisplayText;
  subtitle: DisplayText;
  button: DisplayText;
}

const Title = ({ title, subtitle, button }: TitleProps) => {
  const router = useRouter();
  return (
    <div className="whitespace-nowrap">
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "backOut",
          duration: 1,
        }}
        className={clsx(
          `xl:text-7xl md:text-5xl text-4xl tracking-[0.4rem] font-bold text-[#954bd1] antialiased drop-shadow-2xl underline-offset-[16px] underline decoration-from-font text-shadow-white`,
          title.Font?.options && getFonts(title.Font?.options)
        )}
      >
        {title.text}
      </motion.h2>
      <h2
        className={clsx(
          `md:text-3xl text-xl tracking-[0.30rem] font-bold text-white antialiased mt-5 text-shadow-purple`,
          subtitle.Font?.options && getFonts(subtitle.Font?.options)
        )}
      >
        {subtitle.text}
      </h2>
      <div>
        <Button
          onClick={() => router.push("/shop/search")}
          className={clsx(
            "bg-gray-950 p-6 rounded-xl w-full md:w-40 transition-all hover:bg-gray-900 hover:opacity-80 mt-8",
            button.Font?.options && getFonts(button.Font?.options)
          )}
        >
          <h3 className="text-md font-bold text-white m-3">{button.text}</h3>
        </Button>
      </div>
    </div>
  );
};

export default Title;
