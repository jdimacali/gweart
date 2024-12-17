import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramPost } from "@/types/instagram";
import { MediaRenderer } from "./MediaRenderer";

interface PostCardProps {
  post: InstagramPost;
  currentIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  preview?: boolean;
}

export const PostCard = ({ post, currentIndex, onPrevImage, onNextImage, preview }: PostCardProps) => {
  const baseClasses = "bg-zinc-800/50 rounded-xl backdrop-blur-sm border border-purple-500/20 overflow-hidden";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={baseClasses}
      style={preview ? {
        WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 35%, rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 0) 100% 50% / 100% 100% repeat-x',
        mask: 'linear-gradient(to bottom, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 35%, rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 0) 100% 50% / 100% 100% repeat-x'
      } : undefined}
    >
      <div className="relative aspect-square">
        {post.media_type === "CAROUSEL_ALBUM" && post.children?.data ? (
          <>
            <MediaRenderer mediaItem={post.children.data[currentIndex]} />
            {post.children.data.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onPrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white/75 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white/75 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {post.children.data.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        idx === currentIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
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
          <p className="text-gray-300 line-clamp-3 mb-2">{post.caption}</p>
        )}
        <p className="text-sm text-gray-400">
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