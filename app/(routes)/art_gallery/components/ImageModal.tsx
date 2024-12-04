"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

interface ImageModalProps {
  artwork: Artwork;
  onClose: () => void;
}

const ImageModal = ({ artwork, onClose }: ImageModalProps) => {
  const capitalizeTitle = (title: string) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.error("This artwork is protected by copyright");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center select-none p-4 md:p-8"
      onContextMenu={handleContextMenu}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="relative w-auto h-auto max-w-[85vw] max-h-[85vh] flex items-center justify-center 
                 bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden"
      >
        <div className="relative flex items-center justify-center">
          <Image
            src={artwork.image.data.attributes.formats.small.url}
            alt={artwork.name}
            width={1200}
            height={1200}
            className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
            priority
            draggable={false}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            {capitalizeTitle(artwork.name)}
          </h3>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Gweart. All rights reserved.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;
