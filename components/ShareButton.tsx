"use client";

import { Share } from "lucide-react";
import { motion } from "framer-motion";
import { Events } from "@/app/(routes)/upcoming_events/page";
import { useState } from "react";

interface ShareButtonProps {
  event: Events;
  variant?: "default" | "orange";
}

const ShareButton = ({ event, variant = "default" }: ShareButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const shareData = {
      title: event.attributes.name,
      text: `Check out this event: ${event.attributes.name}`,
      url: event.attributes.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const iconColorClass =
    variant === "orange"
      ? "text-orange-300 hover:text-orange-400"
      : "text-purple-300 hover:text-white";

  return (
    <div className="relative z-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
      >
        <Share size={20} className={`${iconColorClass} transition-colors`} />
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
          Share Event
        </div>
      )}
    </div>
  );
};

export default ShareButton;
