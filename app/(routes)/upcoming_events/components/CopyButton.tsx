import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CopyButtonProps {
  address: string;
  variant?: 'default' | 'orange';
}

const CopyButton = ({ address, variant = 'default' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

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

  const iconColorClass = variant === 'orange' 
    ? "text-orange-300 hover:text-orange-400" 
    : "text-purple-300 hover:text-white";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
    >
      {copied ? (
        <Check size={20} className="text-green-400" />
      ) : (
        <Copy
          size={20}
          className={`${iconColorClass} transition-colors`}
        />
      )}
    </motion.button>
  );
};

export default CopyButton;
