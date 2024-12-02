import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CountdownTimer = ({ startDate }: { startDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const distance = start - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0) {
    return null;
  }

  return (
    <motion.div
      className="absolute top-4 left-4 z-30 bg-black/60 px-3 py-1 rounded-lg text-sm font-mono text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}
    </motion.div>
  );
};

export default CountdownTimer;
