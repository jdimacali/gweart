import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Events } from "../page";

const CalendarButton = ({ event }: { event: Events }) => {
  const addToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    const { name, address, start_date, end_date } = event.attributes;
    const endDate = end_date || start_date;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      name
    )}&location=${encodeURIComponent(address)}&dates=${start_date.replace(
      /[-:]/g,
      ""
    )}/${endDate.replace(/[-:]/g, "")}`;

    window.open(url, "_blank");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={addToCalendar}
      className="absolute bottom-4 right-[44px] z-30 p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
    >
      <Calendar
        size={20}
        className="text-purple-300 hover:text-white transition-colors"
      />
    </motion.button>
  );
};

export default CalendarButton;
