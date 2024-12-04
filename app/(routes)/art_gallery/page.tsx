"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import Spin from "@/components/Spin";
import Link from "next/link";
import ArtworkCard from "./components/ArtworkCard";
import { toast } from "sonner";
import ImageModal from "./components/ImageModal";

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

const Gallery = () => {
  const [artworks, setArtworks] = useState<Artwork[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Artwork | null>(null);

  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1,
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("/api/gallery");
        if (!response.data || !response.data.attributes?.Artwork) {
          setError("No artworks available at the moment.");
          return;
        }
        setArtworks(response.data.attributes.Artwork);
      } catch (error) {
        setError("Failed to load the gallery. Please try again later.");
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 via-purple-950/20 to-zinc-900">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-purple-950/70 to-zinc-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1
            className="text-4xl md:text-5xl font-creep text-purple-300 mb-6 
                       drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            Art Gallery
          </h1>
          <div
            className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-xl max-w-md mx-auto
                        border border-purple-500/20"
          >
            <p className="text-gray-300 text-lg mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-purple-700/20 hover:bg-purple-700/30
                       text-purple-300 rounded-lg transition-all duration-300
                       border border-purple-500/30 hover:border-purple-500/50"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-fuchsia-900/40 via-fuchsia-950/40 to-purple-950/10 relative 
                     bg-repeat bg-opacity-50"
    >
      <Image
        src="/web.png"
        width={900}
        height={900}
        alt="web"
        className="absolute -top-3 -left-5 max-md:w-[100%] max-md:object-contain opacity-10 pointer-events-none scale-[0.95]"
        priority
      />
      <Image
        src="/web.png"
        width={900}
        height={900}
        alt="web"
        className="absolute -bottom-2 -right-3 max-md:w-[100%] max-md:object-contain opacity-10 rotate-180 pointer-events-none scale-[0.95]"
        priority
      />

      <div className="relative px-6 md:px-8 lg:px-12 py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[2000px] mx-auto"
        >
          <h1
            className="text-4xl md:text-6xl font-mania text-center mb-16 
             text-white
              bg-clip-text
             drop-shadow-[0_0_15px_rgba(0, 0, 0, 0.6)]"
          >
            GWE_ART
            <br />
            GALLERY
          </h1>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {artworks?.map((artwork) => (
              <ArtworkCard
                key={artwork.name}
                artwork={artwork}
                onSelect={setSelectedImage}
              />
            ))}
          </Masonry>

          <AnimatePresence>
            {selectedImage && (
              <ImageModal
                artwork={selectedImage}
                onClose={() => setSelectedImage(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
