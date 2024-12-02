import { motion } from "framer-motion";

const Header = () => {
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  const upcomingLetters = ["U", "P", "C", "O", "M", "I", "N", "G"];
  const eventsLetters = ["E", "V", "E", "N", "T", "S"];

  return (
    <motion.div
      className="flex flex-col text-center items-center justify-center relative sm:space-y-2 space-y-8 z-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 className="flex gap-x-6 lg:text-[4rem] sm:text-[3rem] max-sm:text-[2rem] font-dokdo ">
        <div>
          {["F", "I", "N", "D"].map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block hover:scale-110 transition-transform"
              style={{
                rotate: [-12, -10, -8, -5][i],
                translateY: [-1, -1, -2, -3][i],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div>
          {["M", "E"].map((char, i) => (
            <motion.span
              key={i}
              custom={i + 4}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block hover:scale-110 transition-transform"
              style={{
                rotate: [-8, -1][i],
                translateY: [-21.6, -24][i],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div>
          {["A", "T"].map((char, i) => (
            <motion.span
              key={i}
              custom={i + 6}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block hover:scale-110 transition-transform"
              style={{
                rotate: [-10, -1][i],
                translateY: [-24, -23.2][i],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div>
          {["T", "H", "E", "S", "E"].map((char, i) => (
            <motion.span
              key={i}
              custom={i + 8}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block hover:scale-110 transition-transform"
              style={{
                rotate: [9, 11, 14, 17, 20][i],
                translateY: [-16, -12, -8, -4, 0][i],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.h3>

      <motion.h1
        className="flex xl:text-[6rem] md:text-[4rem] sm:text-[3.5rem] text-[2rem] font-creep text-amber-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
      >
        <div className="flex gap-x-2">
          {upcomingLetters.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 5, 0] }}
              className="inline-block"
              style={{
                rotate: [-23, -20, -16, -12, -10, -7, -3, -3][i],
                translateY: [-36, -44, -48, -56, -56, -56, -56, -56][i],
              }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block mr-8" />
        </div>
        <div className="flex gap-x-2">
          {eventsLetters.map((char, i) => (
            <motion.span
              key={i}
              custom={i + upcomingLetters.length}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 5, 0] }}
              className="inline-block"
              style={{
                rotate: [1, 4, 8, 19, 20, 23][i],
                translateY: [-56, -56, -48, -40, -24, -8][i],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.h1>
    </motion.div>
  );
};

export default Header;
