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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-fuchsia-950/30 to-zinc-950">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-fuchsia-950/30 to-zinc-950 px-4">
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
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-fuchsia-950/30 to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[50vh] pointer-events-none">
        <div className="absolute -left-3 top-0">
          <Image
            src="/web.png"
            width={900}
            height={900}
            alt="web"
            className="w-[45vw] h-auto opacity-70 lg:block hidden "
            priority
          />
        </div>
        <div className="absolute -right-3 top-0 scale-x-[-1] lg:block hidden">
          <Image
            src="/web.png"
            width={900}
            height={900}
            alt="web"
            className="w-[45vw] h-auto opacity-70 "
            priority
          />
        </div>
      </div>

      <div className="relative px-6 md:px-8 lg:px-12 py-20 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-[2000px] mx-auto"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="relative text-center mb-16"
          >
            <h1 className="relative font-mania text-6xl md:text-7xl">
              <span className="absolute inset-0  text-white/[0.08] translate-y-[3px] translate-x-[3px] text-7xl md:text-[5.25rem] opacity-30">
                GWE_ART
                <br />
                GALLERY
              </span>
              <span
                className="relative inline-block text-6xl md:text-7xl text-white
                           [text-shadow:_1px_1px_0_rgb(255_255_255_/_20%),_2px_2px_0_rgb(255_255_255_/_15%),_3px_3px_0_rgb(255_255_255_/_10%),_4px_4px_0_rgb(255_255_255_/_5%),_5px_5px_15px_rgb(0_0_0_/_50%)]
                           hover:[text-shadow:_1px_1px_0_rgb(255_255_255_/_25%),_2px_2px_0_rgb(255_255_255_/_20%),_3px_3px_0_rgb(255_255_255_/_15%),_4px_4px_0_rgb(255_255_255_/_10%),_6px_6px_20px_rgb(0_0_0_/_60%)]
                           transition-all duration-300"
              >
                GWE_ART
                <br />
                GALLERY
              </span>
            </h1>
          </motion.div>

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
