export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Master {
  id: string;
  name: string;
  listingTitle: string;
  title: string;
  avatar: string;
  coverImage: string;
  services: string[];
  city: string;
  district: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  experience: string;
  bio: string;
  reviews: Review[];
  references: {
    description: string;
    image: string;
  }[];
  documents: {
    name: string;
    type: 'pdf' | 'image';
    url: string;
  }[];
}
