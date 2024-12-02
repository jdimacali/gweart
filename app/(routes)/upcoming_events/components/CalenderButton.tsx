import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Events } from "../page";

interface CalendarButtonProps {
  event: Events;
  variant?: 'default' | 'orange';
}

const CalendarButton = ({ event, variant = 'default' }: CalendarButtonProps) => {
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

  const iconColorClass = variant === 'orange' 
    ? "text-orange-300 hover:text-orange-400" 
    : "text-purple-300 hover:text-white";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={addToCalendar}
      className="p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
    >
      <Calendar
        size={20}
        className={`${iconColorClass} transition-colors`}
      />
    </motion.button>
  );
};

export default CalendarButton;
