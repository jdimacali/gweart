import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CopyButton = ({ address }: { address: string }) => {
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

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="absolute bottom-4 right-[84px] z-30 p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
    >
      {copied ? (
        <Check size={20} className="text-green-400" />
      ) : (
        <Copy
          size={20}
          className="text-purple-300 hover:text-white transition-colors"
        />
      )}
    </motion.button>
  );
};

export default CopyButton;
