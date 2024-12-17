import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, Share2, Bookmark, Heart } from "lucide-react";
import { InstagramPost } from "@/types/instagram";
import { MediaRenderer } from "./MediaRenderer";
import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";
import { useState } from "react";

interface PostCardProps {
  post: InstagramPost;
  currentIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  preview?: boolean;
}

export const PostCard = ({ post, currentIndex, onPrevImage, onNextImage, preview }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const baseClasses = "bg-zinc-800/50 rounded-xl backdrop-blur-sm border border-purple-500/20 overflow-hidden";
  
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const formattedDate = format(new Date(post.timestamp), "MMMM d, yyyy");
  
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
      {/* Post Header */}
      <div className="p-3 sm:p-4 flex items-center justify-between border-b border-purple-500/10">
        <Link 
          href={`https://instagram.com/${post.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
              {post.thumbnail_url ? (
                <Image
                  src={post.thumbnail_url}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <span className="text-xs font-medium text-purple-300">GWE</span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-200">@{post.username}</span>
            <span className="text-xs text-gray-400">Girl Wonder Extraordinaire</span>
          </div>
        </Link>
        <button 
          className="text-purple-300/50 hover:text-purple-300 transition-colors p-1 rounded-full hover:bg-purple-500/10"
          title="Share post"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Media Content */}
      <div className="relative aspect-square group">
        {post.media_type === "CAROUSEL_ALBUM" && post.children?.data ? (
          <>
            <MediaRenderer mediaItem={{
              ...post.children.data[currentIndex],
              timestamp: post.timestamp,
              permalink: post.permalink
            }} />
            {post.children.data.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onPrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/75 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/75 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
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
              timestamp: post.timestamp,
              permalink: post.permalink
            }}
          />
        )}

        {/* Media Type Indicators */}
        <div className="absolute top-4 right-4 flex gap-2">
          {post.media_type === "CAROUSEL_ALBUM" && (
            <div className="text-white/90 bg-black/50 p-1.5 rounded-full">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor">
                <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
              </svg>
            </div>
          )}
          {post.media_type === "VIDEO" && (
            <div className="text-white/90 bg-black/50 p-1.5 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5zm5.5 4.5l5 3-5 3v-6z"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="p-3 sm:p-4">
        {/* Interaction Buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-colors ${isLiked ? 'text-red-500' : 'text-purple-300/70 hover:text-purple-300'}`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <Link
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300/70 hover:text-purple-300 transition-colors"
              title="Comment on Instagram"
            >
              <MessageCircle className="w-6 h-6" />
            </Link>
            <button 
              className="text-purple-300/70 hover:text-purple-300 transition-colors"
              title="Share"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`transition-colors ${isSaved ? 'text-purple-300' : 'text-purple-300/70 hover:text-purple-300'}`}
            title={isSaved ? 'Remove from saved' : 'Save'}
          >
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Like Count */}
        {post.like_count && (
          <p className="text-sm font-medium text-gray-200 mb-1">
            {post.like_count.toLocaleString()} likes
          </p>
        )}

        {/* Caption */}
        {post.caption && (
          <div className="space-y-1">
            <p className="text-gray-300 text-sm">
              <Link
                href={`https://instagram.com/${post.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-200 mr-2 hover:underline"
              >
                @{post.username}
              </Link>
              <span className="line-clamp-3">{post.caption}</span>
            </p>
          </div>
        )}

        {/* Comments Count */}
        {post.comments_count && (
          <Link
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-gray-400 hover:text-gray-300 transition-colors mt-2"
          >
            View all {post.comments_count.toLocaleString()} comments
          </Link>
        )}

        {/* Date */}
        <Link
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs text-gray-500 uppercase tracking-wider mt-3 hover:text-gray-400 transition-colors"
          title={formattedDate}
        >
          {timeAgo}
        </Link>
      </div>
    </motion.div>
  );
}; 