export interface Dashboard {
  Title: DisplayText;
  Subtitle: DisplayText;
  Images: {
    id: number;
    data: {
      attributes: {
        formats: {
          small: {
            url: string;
          };
        };
        url: string;
      };
    }[];
  };
  Button_Text: DisplayText;
}

export interface Slide {
  id: number;
  url: string;
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

export interface Event {
  id: number;
  attributes: {
    url: string;
    name: string;
    address: string;
    start_date: string;
    end_date?: string;
    image: {
      data: {
        id: number;
        attributes: {
          formats: {
            large: {
              url: string;
            };
          };
          url: string;
        };
      };
    };
  };
}

export interface Linktree {
  Title: DisplayText;
  Subtitle: DisplayText;
  Links: { id: number; name: string; url: string; icon?: string }[];
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    price: number;
    description: string;
    availability: boolean;
    image: {
      data: [
        {
          id: number;
          attributes: {
            url: string;
          };
        }
      ];
    };
    categories: {
      data: Category[];
    };
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    point: [
      {
        id: number;
        point: string;
      }
    ];
  };
}

export interface CartItemProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  categories: { data: { attributes: { name: string } }[] };
}

export interface Metadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface Font {
  id: number;
  options?: string;
}

export interface DisplayText {
  id: number;
  text: string;
  Font: Font;
}

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
