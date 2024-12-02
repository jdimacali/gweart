import { Share } from "lucide-react";
import { motion } from "framer-motion";
import { Events } from "../page";

interface ShareButtonProps {
  event: Events;
  variant?: 'default' | 'orange';
}

const ShareButton = ({ event, variant = 'default' }: ShareButtonProps) => {
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
        // Fallback for browsers that don't support native sharing
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const iconColorClass = variant === 'orange' 
    ? "text-orange-300 hover:text-orange-400" 
    : "text-purple-300 hover:text-white";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="p-1 hover:bg-purple-500/20 rounded-full transition-all duration-300"
    >
      <Share
        size={20}
        className={`${iconColorClass} transition-colors`}
      />
    </motion.button>
  );
};

export default ShareButton;
