import Image from "next/image";
import { motion } from "framer-motion";

const Divider = () => {
  return (
    <div className="relative w-full h-16 flex justify-center items-center -my-8 z-10 pb-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative h-[30px] w-full flex items-center justify-center"
      >
        <Image
          src="/divider.png"
          alt="divider"
          width={200}
          height={30}
          className="object-contain opacity-50 pb-1 relative z-10 "
        />
        <div className="absolute inset-0 rounded-full blur-lg z-0" />
      </motion.div>
    </div>
  );
};

export default Divider;
