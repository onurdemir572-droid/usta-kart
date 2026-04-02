export interface Master {
  id: string;
  name: string;
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
