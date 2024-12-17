import { Play } from "lucide-react";
import Image from "next/image";
import { MediaItem } from "@/types/instagram";

interface MediaRendererProps {
  mediaItem: MediaItem;
  onDoubleClick?: () => void;
}

export const MediaRenderer = ({
  mediaItem,
  onDoubleClick,
}: MediaRendererProps) => {
  if (mediaItem.media_type === "VIDEO") {
    return (
      <div className="relative aspect-square">
        <video
          src={mediaItem.media_url}
          controls
          className="absolute inset-0 w-full h-full object-cover"
          poster={mediaItem.thumbnail_url}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 p-3 rounded-full">
            <Play className="w-8 h-8 text-white" fill="white" />
          </div>
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
      />
    </div>
  );
};
