export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  role: "superadmin" | "admin" | "user";
  gender: "male" | "female" | "other";
  profession: string;
  bio: string;
  interests: string[];
  avatar: {
    url: string;
    public_id: string;
  };
  socialLinks: {
    github: string;
    instagram: string;
    linkedin: string;
  };
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Creator {
  _id: string;
  profession: string;
  name: string;
  avatar: {
    url: string;
    public_id: string;
  };
}

export interface Skill {
  _id: string;
  banner: {
    url: string;
    public_id: string | null;
  };
  title: string;
  description: string;
  category: string;
  rating: number;
  reviewsCount: number;
  creator: Creator;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
