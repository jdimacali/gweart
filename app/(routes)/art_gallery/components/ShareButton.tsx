"use client";

import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url: string;
}

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: title,
      text: `Check out this artwork: ${title}`,
      url: url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error("Failed to share artwork");
      }
    }
  };

  return (
    <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
      <motion.button
        onClick={handleShare}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 hover:bg-purple-500/20 rounded-full transition-all duration-300"
      >
        <Share2
          size={20}
          className="text-fuchsia-200 hover:text-white transition-colors"
        />
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
          Share
        </div>
      )}
    </div>
  );
};

export default ShareButton;
