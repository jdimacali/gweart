// Import framer-motion library
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
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "backOut",
          duration: 1,
        }}
        className="break-words text-6xl tracking-[0.35rem] font-bold text-[#8b46c4] font-mania antialiased drop-shadow-2xl underline-offset-[13px] underline decoration-from-font text-shadow-white"
      >
        {title}
      </motion.h2>
      <h2 className="text-2xl tracking-[0.30rem] font-bold text-[#ffffff] font-mania antialiased mt-5 text-shadow-purple">
        {subtitle}
      </h2>
      <div>
        <Button
          onClick={() => router.push("https://gweart.square.site/")}
          className="bg-gray-950 p-6 rounded-xl max-sm:w-[90vw] transition-all hover:bg-gray-900 hover:opacity-80 mt-8"
        >
          <h3 className="text-md font-bold text-white m-3">{button}</h3>
        </Button>
      </div>
    </div>
  );
};

export default Title;
