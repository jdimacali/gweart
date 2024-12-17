export interface MediaItem {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp?: string;
  permalink?: string;
}

export interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  media_count?: number;
  children?: {
    data: MediaItem[];
  };
  engagement_rate?: number;
  views?: number;
  plays?: number;
  shares?: number;
}

export interface InstagramProfile {
  username: string;
  profile_picture_url: string;
  display_name: string;
  media_count: number;
  followers_count?: number;
  follows_count?: number;
}
