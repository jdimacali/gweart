export interface Dashboard {}

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
          url: string;
        };
      };
    };
  };
}

export interface Linktree {
  Title: string;
  Subtitle: string;
  Links: { id: number; name: string; url: string; icon?: string }[];
}

export interface Product {}

export interface Category {}
