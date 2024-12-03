import Image from "next/image";
import { motion } from "framer-motion";

const Clown = ({
  children,
  hasError,
}: {
  children: React.ReactNode;
  hasError?: boolean;
}) => {
  return (
    <div className="flex flex-col justify-center items-center lg:overflow-visible overflow-clip relative w-full py-4">
      <motion.div
        className="relative h-[22rem] w-[660px] sm:w-[600px] z-[20] -mb-28 pointer-events-none"
        initial={{ y: -20 }}
        animate={{
          y: [-20, -10, -20],
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
      <div className="flex w-full relative">
        <div
          className={`absolute ${
            hasError ? "h-[36rem]" : "h-[31rem]"
          } w-[180px] sm:w-[70px] left-1/2 transform -translate-x-[379%] pointer-events-none transition-all duration-300`}
        >
          <Image
            src="/clown/left.png"
            fill
            alt="clown_bottom"
            className="absolute"
            priority
          />
        </div>

        <div className="flex justify-center items-center w-full relative z-[2]">
          {children}
        </div>

        <div
          className={`absolute ${
            hasError ? "h-[36rem]" : "h-[31rem]"
          } w-[160px] sm:w-[75px] left-1/2 transform translate-x-[255%] pointer-events-none transition-all duration-300`}
        >
          <Image
            src="/clown/right.png"
            fill
            alt="clown_bottom"
            className="absolute"
            priority
          />
        </div>
      </div>
      <motion.div
        className="relative h-60 w-[580px] sm:w-[500px] z-[10] -mt-24 pointer-events-none"
        initial={{ y: 20 }}
        animate={{
          y: [20, 10, 20],
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
