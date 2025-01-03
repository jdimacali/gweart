import { Play, ImageOff, VideoOff } from "lucide-react";
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
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  if (mediaItem.media_type === "VIDEO") {
    if (hasError) {
      return (
        <div className="relative aspect-square bg-zinc-800 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <VideoOff className="w-8 h-8" />
            <p className="text-sm">Video failed to load</p>
          </div>
        </div>
      );
    }

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
          onError={handleError}
        />
        {!isPlaying && !hasError && (
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

  if (hasError) {
    return (
      <div className="relative aspect-square bg-zinc-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <ImageOff className="w-8 h-8" />
          <p className="text-sm">Image failed to load</p>
        </div>
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
        onError={handleError}
      />
    </div>
  );
};
