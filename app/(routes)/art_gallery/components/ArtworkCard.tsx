"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ShareButton from "./ShareButton";
import { toast } from "sonner";

interface Artwork {
  name: string;
  image: {
    data: {
      id: number;
      attributes: {
        formats: {
          small: {
            url: string;
          };
        };
      };
    };
  };
}

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
}

const ArtworkCard = ({ artwork, onSelect }: ArtworkCardProps) => {
  const capitalizeTitle = (title: string) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <motion.div
      key={artwork.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-xl backdrop-blur-sm"
      onContextMenu={(e) => {
        e.preventDefault();
        toast.error("This artwork is protected by copyright");
      }}
    >
      <div
        className="relative group cursor-pointer overflow-hidden rounded-xl 
                 bg-white/[0.05] backdrop-blur-[2px] select-none
                 hover:bg-white/[0.08] transition-all duration-500"
        onClick={() => onSelect(artwork)}
      >
        <div className="relative">
          <Image
            src={artwork.image.data.attributes.formats.small.url}
            alt={artwork.name}
            width={400}
            height={400}
            className="w-full h-auto transition-all duration-500 
                     group-hover:scale-105 group-hover:brightness-110"
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
          <div
            className="absolute inset-0 bg-transparent pointer-events-none"
            style={{ WebkitTouchCallout: "none" }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 ">
          <div className="flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-semibold text-lg">
              {capitalizeTitle(artwork.name)}
            </p>
            <ShareButton title={artwork.name} url={window.location.href} />
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-xl ring-1 ring-white/10 
                   group-hover:ring-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                   transition-all duration-500"
        />
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
