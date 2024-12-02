import Image from "next/image";
import { motion } from "framer-motion";

const Clown = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center lg:overflow-visible overflow-clip relative w-full my-10">
      <motion.div
        className="relative h-[22rem]  w-[660px] sm:w-[600px] z-[20] -mb-24"
        initial={{ y: -20 }}
        animate={{
          y: [-20, -10, -20],
          rotate: [0, -1, 1, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          },
          rotate: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/clown/top.png"
          fill
          alt="clown_top"
          className="absolute object-contain"
          priority
        />
      </motion.div>

      <div className="flex justify-center items-center w-full relative z-[2]">
        {children}
      </div>

      <motion.div
        className="relative h-60  w-[580px] sm:w-[550px] z-[20] -mt-24"
        initial={{ y: 20 }}
        animate={{
          y: [20, 10, 20],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          },
          rotate: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 0.5,
          },
        }}
      >
        <Image
          src="/clown/bottom.png"
          fill
          alt="clown_bottom"
          className="absolute object-contain"
          priority
        />
      </motion.div>
    </div>
  );
};

export default Clown;
