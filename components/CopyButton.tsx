"use client";

import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CopyButtonProps {
  address: string;
  variant?: "default" | "orange";
}

const CopyButton = ({ address, variant = "default" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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
        onClick={handleCopy}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
      >
        {copied ? (
          <Check size={20} className="text-green-400" />
        ) : (
          <Copy size={20} className={`${iconColorClass} transition-colors`} />
        )}
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
          Copy Address
        </div>
      )}
    </div>
  );
};

export default CopyButton;
