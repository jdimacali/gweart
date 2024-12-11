import { motion } from "framer-motion";
import { useMemo } from "react";

const Header = () => {
  // Optimized letter animation with reduced complexity
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03, // Reduced delay
        duration: 0.4, // Reduced duration
        ease: "easeOut", // Simplified easing
      },
    }),
  };

  // Pre-compute letter arrays and their properties
  const findMeAtThese = useMemo(
    () => [
      { chars: "FIND", rotate: [-8, -6, -4, -2], translateY: [-1, -1, -2, -3] },
      {
        chars: "ME",
        rotate: [-4, -1],
        translateY: [-21.6, -24],
        customIndex: 4,
      },
      {
        chars: "AT",
        rotate: [-6, -1],
        translateY: [-24, -23.2],
        customIndex: 6,
      },
      {
        chars: "THESE",
        rotate: [4, 6, 8, 10, 12],
        translateY: [-16, -12, -8, -4, 0],
        customIndex: 8,
      },
    ],
    []
  );

  const upcomingEvents = useMemo(() => {
    const upcoming = "UPCOMING".split("").map((char, i) => ({
      char,
      rotate: [-20, -17, -14, -10, -8, -6, -3, -3][i],
      translateY: [-36, -44, -48, -56, -56, -56, -56, -56][i],
    }));

    const events = "EVENTS".split("").map((char, i) => ({
      char,
      rotate: [1, 4, 8, 12, 14, 16][i],
      translateY: [-56, -56, -48, -40, -24, -8][i],
      customIndex: i + upcoming.length,
    }));

    return { upcoming, events };
  }, []);

  return (
    <motion.div
      className="flex flex-col text-center items-center justify-center relative sm:space-y-2 space-y-8 z-1 mb-16 md:mb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* First line */}
      <motion.h3 className="flex gap-x-6 lg:text-[4rem] sm:text-[3rem] max-sm:text-[2rem] font-dokdo">
        {findMeAtThese.map(
          ({ chars, rotate, translateY, customIndex = 0 }, groupIndex) => (
            <div key={groupIndex}>
              {chars.split("").map((char, i) => (
                <motion.span
                  key={`${groupIndex}-${i}`}
                  custom={i + customIndex}
                  variants={letterAnimation}
                  initial="hidden"
                  animate="visible"
                  className="inline-block hover:scale-110 transition-transform"
                  style={{
                    rotate: rotate[i],
                    translateY: translateY[i],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )
        )}
      </motion.h3>

      {/* Second line */}
      <motion.h1
        className="flex xl:text-[6rem] md:text-[4rem] sm:text-[3.5rem] text-[2rem] font-creep text-amber-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }} // Reduced delay
      >
        <div className="flex gap-x-2">
          {upcomingEvents.upcoming.map(({ char, rotate, translateY }, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }} // Reduced scale for better performance
              className="inline-block"
              style={{
                rotate,
                translateY,
              }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block mr-8" />
        </div>
        <div className="flex gap-x-2">
          {upcomingEvents.events.map(
            ({ char, rotate, translateY, customIndex }, i) => (
              <motion.span
                key={i}
                custom={customIndex}
                variants={letterAnimation}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="inline-block"
                style={{
                  rotate,
                  translateY,
                }}
              >
                {char}
              </motion.span>
            )
          )}
        </div>
      </motion.h1>
    </motion.div>
  );
};

export default Header;
