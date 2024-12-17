import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

const CountdownTimer = ({ startDate }: { startDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const timeZone = "America/Los_Angeles";
      const now = toZonedTime(new Date(), timeZone);
      const start = toZonedTime(parseISO(startDate), timeZone);

      if (start <= now) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = differenceInDays(start, now);
      const hours = differenceInHours(start, now) % 24;
      const minutes = differenceInMinutes(start, now) % 60;

      setTimeLeft({ days, hours, minutes });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every minute
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return null;
  }

  return (
    <motion.div
      className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl text-base font-mono text-white
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-white/10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <span className="font-bold text-orange-400">{timeLeft.days}</span>
          <span className="text-xs text-gray-400">days</span>
        </div>
        <span className="text-orange-400">:</span>
        <div className="flex flex-col items-center">
          <span className="font-bold text-orange-400">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-xs text-gray-400">hrs</span>
        </div>
        <span className="text-orange-400">:</span>
        <div className="flex flex-col items-center">
          <span className="font-bold text-orange-400">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-xs text-gray-400">min</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
