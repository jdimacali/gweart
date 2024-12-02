import Link from "next/link";
import { motion } from "framer-motion";

interface LinktreeLinkProps {
  name: string;
  url: string;
  icon?: string;
}

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

const getIconByName = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("shop")) {
    return <ShoppingCart className="w-5 h-5" />;
  }

  switch (lowerName) {
    case "facebook":
      return <Facebook className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5" />;
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    default:
      return <ExternalLink className="w-5 h-5" />; // Default icon for other links
  }
};

const LinktreeLink = ({ name, url, icon }: LinktreeLinkProps) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-xl overflow-hidden bg-gradient-to-r from-[#9DC808]/50 to-[#9bc253] 
                   backdrop-blur-sm w-full mx-auto font-semibold p-4 
                   border border-[#9DC808]/20 hover:border-[#9DC808]/40
                   transition-all duration-300 shadow-lg hover:shadow-[#9DC808]/20"
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#9DC808]/0 via-[#9DC808]/0 to-[#9DC808]/0 
                      group-hover:from-[#9DC808]/10 group-hover:via-[#9DC808]/20 group-hover:to-[#9DC808]/10 
                      transition-all duration-500"
        />

        <div className="relative flex items-center">
          {/* Left icon container with fixed width */}
          <div className="absolute left-0 w-5 text-[#b8d87e] group-hover:text-[#d4e4ab] transition-colors">
            {getIconByName(name)}
          </div>

          {/* Centered text container */}
          <h1
            className="flex-1 text-base text-center font-bold tracking-wide text-white/90 
                       group-hover:text-white transition-colors w-full"
          >
            {name}
          </h1>
        </div>
      </motion.div>
    </Link>
  );
};

export default LinktreeLink;
