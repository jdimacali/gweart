export interface Dashboard {
  Title: string;
  Subtitle: string;
  Images: {
    id: number;
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
  Button: string;
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

export interface Product {
  id: number;
  attributes: {
    name: string;
    price: number;
    description: string;
    availablitiy: boolean;
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
      data: [
        {
          id: number;
          attributes: {
            name: string;
          };
        }
      ];
    };
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
  };
}
