import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DisplayText } from "@/types";
import clsx from "clsx";
import { getFonts } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface TitleProps {
  title?: DisplayText;
  subtitle?: DisplayText;
  button: DisplayText;
}

const Title = ({ title, subtitle, button }: TitleProps) => {
  const router = useRouter();

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  // Split the title into words and add spacing if title exists
  const words = title?.text.split(" ").map((word, wordIndex, wordsArray) => (
    <span key={wordIndex} className="inline-block">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i + wordIndex * 10} // Offset animation delay for each word
          variants={letterAnimation}
          initial="hidden"
          animate="visible"
          className="inline-block hover:scale-110 transition-transform"
        >
          {char}
        </motion.span>
      ))}
      {/* Add space between words, except for the last word */}
      {wordIndex !== wordsArray.length - 1 && (
        <span className="inline-block w-6" /> // Adjust the w-6 value to increase/decrease spacing
      )}
    </span>
  ));

  return (
    <div className="relative mb-10">
      {/* Background glow effect */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 animate-pulse" />

      {/* Main title */}
      {title && (
        <motion.h2
          className={clsx(
            `relative break-words md:text-7xl text-6xl tracking-[0.35rem] font-bold text-[#8b46c4]
             antialiased drop-shadow-2xl underline-offset-[13px] underline decoration-from-font 
             text-shadow-white hover:text-shadow-purple transition-all duration-500`,
            title.Font.options && getFonts(title.Font.options)
          )}
        >
          {words}
        </motion.h2>
      )}

      {/* Subtitle with fade-in effect */}
      {subtitle && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className={clsx(
            `text-3xl tracking-[0.30rem] font-bold text-white antialiased mt-8
             text-shadow-purple hover:text-shadow-white transition-all duration-300`,
            subtitle.Font.options && getFonts(subtitle.Font.options)
          )}
        >
          {subtitle.text}
        </motion.h2>
      )}

      {/* Animated button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          delay: 1,
          duration: 0.5,
          y: {
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 4, // 4 seconds pause + 1 second animation = 5 second interval
          },
        }}
      >
        <Button
          onClick={() => router.push("https://gweart.square.site/")}
          className={clsx(
            `flex justify-center items-center relative bg-black p-6 rounded-xl max-sm:w-[90vw] mt-8 md:px-20
             hover:bg-purple-950 hover:scale-105 transition-all duration-300
             shadow-[0_0_15px rgba(0,0,0,0.3)] hover:shadow-[0_0_25px rgba(0,0,0,0.5)]`,
            button.Font.options && getFonts(button.Font.options)
          )}
        >
          <h3 className="text-lg font-bold text-white m-3 flex items-center justify-center">
            {button.text}
            <ArrowRight className="ml-2 text-white" size={22} />
          </h3>
        </Button>
      </motion.div>
    </div>
  );
};

export default Title;
