import { Play } from "lucide-react";
import Image from "next/image";
import { MediaItem } from "@/types";
import { useState, useRef } from "react";

interface MediaRendererProps {
  mediaItem: MediaItem;
  onDoubleClick?: () => void;
}

export const MediaRenderer = ({
  mediaItem,
  onDoubleClick,
}: MediaRendererProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (mediaItem.media_type === "VIDEO") {
    return (
      <div 
        className="relative aspect-square"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <video
          ref={videoRef}
          src={mediaItem.media_url}
          className="absolute inset-0 w-full h-full object-cover"
          controls={isPlaying}
          poster={mediaItem.thumbnail_url}
          playsInline
          onClick={(e) => e.stopPropagation()}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.volume = 0.1;
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlayClick}
          >
            <div className="bg-black/50 p-3 rounded-full hover:bg-black/70 transition-all cursor-pointer">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-square" onDoubleClick={onDoubleClick}>
      <Image
        src={mediaItem.media_url}
        alt="Instagram post"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
        priority
      />
    </div>
  );
};
