// Import framer-motion library
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DisplayText } from "@/types";
import clsx from "clsx";

interface TitleProps {
  title: DisplayText;
  subtitle: DisplayText;
  button: DisplayText;
}

const Title = ({ title, subtitle, button }: TitleProps) => {
  const router = useRouter();
  console.log(title.Font.options.trim());
  return (
    <div className="max-sm:mb-4">
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "backOut",
          duration: 1,
        }}
        className={clsx(
          `break-words md:text-6xl text-5xl tracking-[0.35rem] font-bold text-[#8b46c4] antialiased drop-shadow-2xl underline-offset-[13px] underline decoration-from-font text-shadow-white`,
          title?.Font.options && title.Font.options.trim()
        )}
      >
        {title.text}
      </motion.h2>
      <h2
        className={clsx(
          `text-2xl tracking-[0.30rem] font-bold text-[#ffffff]  antialiased mt-5 text-shadow-purple`,
          subtitle?.Font.options && subtitle.Font.options.trim()
        )}
      >
        {subtitle.text}
      </h2>
      <div>
        <Button
          onClick={() => router.push("https://gweart.square.site/")}
          className={`bg-gray-950 p-6 rounded-xl max-sm:w-[90vw] transition-all hover:bg-gray-900 hover:opacity-80 mt-8`}
        >
          <h3 className="text-md font-bold text-white m-3">{button.text}</h3>
        </Button>
      </div>
    </div>
  );
};

export default Title;
