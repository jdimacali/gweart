"use client";

import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Events } from "@/app/(routes)/upcoming_events/page";
import { useState } from "react";

interface CalendarButtonProps {
  event: Events;
  variant?: "default" | "orange" | "amber"; // Added amber as an option
}

const CalendarButton = ({
  event,
  variant = "default",
}: CalendarButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    // Ensure the event has a start_date for Google Calendar
    const startDate = event.attributes.start_date;
    const formattedDate = startDate.split("T")[0]; // Gets YYYY-MM-DD
    const eventTitle = encodeURIComponent(event.attributes.name);
    const eventLocation = encodeURIComponent(event.attributes.address);

    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formattedDate}/${formattedDate}&location=${eventLocation}`;

    // Open in new tab
    window.open(googleCalendarUrl, "_blank");
  };

  const iconColorClass =
    variant === "orange"
      ? "text-orange-300 hover:text-orange-400"
      : variant === "amber" // Added condition for amber variant
      ? "text-amber-100 hover:text-amber-200"
      : "text-purple-300 hover:text-white";

  return (
    <div className="relative z-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCalendar}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className={`p-1 hover:bg-${
          variant === "amber" ? "amber-500" : "purple-500"
        }/20 rounded-full transition-all duration-300`}
      >
        <Calendar size={20} className={`${iconColorClass} transition-colors`} />
      </motion.button>
      {tooltipVisible && (
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 
                   text-white text-xs rounded opacity-100 
                   transition-opacity duration-200 whitespace-nowrap pointer-events-none 
                   after:content-[''] after:absolute after:top-full after:left-1/2 
                   after:-translate-x-1/2 after:border-4 after:border-transparent 
                   after:border-t-black/80"
        >
          Add to Calendar
        </div>
      )}
    </div>
  );
};

export default CalendarButton;
