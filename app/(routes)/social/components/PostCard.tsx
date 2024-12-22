import { motion, useAnimation, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramPost } from "@/types";
import { MediaRenderer } from "./MediaRenderer";
import { useState } from "react";

interface PostCardProps {
  post: InstagramPost;
  currentIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  preview?: boolean;
}

export const PostCard = ({
  post,
  currentIndex,
  onPrevImage,
  onNextImage,
  preview,
}: PostCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50; // minimum distance for swipe
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        onPrevImage();
      } else {
        onNextImage();
      }
    }
    controls.start({ x: 0 });
    setIsDragging(false);
  };

  const baseClasses = `bg-zinc-900/90 rounded-xl backdrop-blur-sm border border-zinc-800 overflow-hidden
                      transform transition-all duration-300 hover:border-purple-500/30
                      shadow-lg shadow-black/20 hover:shadow-purple-500/10
                      group`;

  const buttonClasses = `absolute top-1/2 -translate-y-1/2 bg-zinc-900/90 p-2.5 
                        text-zinc-300 hover:text-white transition-all duration-300
                        hover:bg-purple-500/30 rounded-full z-10
                        backdrop-blur-sm border border-zinc-700
                        opacity-0 group-hover:opacity-100 hover:scale-110
                        shadow-lg shadow-black/20`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} group`}
      style={
        preview
          ? {
              WebkitMask:
                "linear-gradient(to bottom, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 35%, rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 0) 100% 50% / 100% 100% repeat-x",
              mask: "linear-gradient(to bottom, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 35%, rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 0) 100% 50% / 100% 100% repeat-x",
            }
          : undefined
      }
    >
      <div className="relative aspect-square">
        {post.media_type === "CAROUSEL_ALBUM" && post.children?.data ? (
          <motion.div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            <MediaRenderer mediaItem={post.children.data[currentIndex]} />
            {post.children.data.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    if (!isDragging) {
                      e.preventDefault();
                      onPrevImage();
                    }
                  }}
                  className={`${buttonClasses} left-4`}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    if (!isDragging) {
                      e.preventDefault();
                      onNextImage();
                    }
                  }}
                  className={`${buttonClasses} right-4`}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 
                                bg-zinc-900/90 px-3 py-1.5 rounded-full 
                                backdrop-blur-sm border border-zinc-800
                                shadow-lg shadow-black/20"
                >
                  {post.children.data.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        idx === currentIndex ? "bg-purple-400" : "bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <MediaRenderer
            mediaItem={{
              id: post.id,
              media_type: post.media_type,
              media_url: post.media_url,
              thumbnail_url: post.thumbnail_url,
            }}
          />
        )}
      </div>

      <div className="p-4">
        {post.caption && (
          <p className="text-zinc-200 line-clamp-3 mb-2">{post.caption}</p>
        )}
        <p className="text-sm text-zinc-400">
          {new Date(post.timestamp).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
};
