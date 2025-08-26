import AuthBG from "@/assets/images/Auth-BG.png";
import avatar from "@/assets/images/skills-constant/avatar.png";
import graphic from "@/assets/images/skills-constant/graphic.png";
import marketing from "@/assets/images/skills-constant/marketing.png";
import photography from "@/assets/images/skills-constant/photography.png";
import writting from "@/assets/images/skills-constant/writting.png";

export const images = {
  AuthBG,
  photography,
  graphic,
  writting,
  marketing,
  avatar,
};

export const skills = [
  {
    title: "Photography Basics",
    description:
      "Learn the basics of photography, including composition, lighting, and camera settings. Suitable for beginners.",
    banner: images.photography,
    rating: 4.5,
    reviews: 125,
    provider: {
      avatar: images.avatar,
      name: "Sophia Bennett",
      skill: "Experienced Photographer",
    },
  },
  {
    title: "Creative Writing Workshop",
    description:
      "Explore different writing styles and techniques to enhance your storytelling.",
    banner: images.writting,
    rating: 5,
    reviews: 105,
    provider: {
      avatar: images.avatar,
      name: "Sophia Bennett",
      skill: "Experienced Photographer",
    },
  },
  {
    title: "Digital Marketing Strategies",
    description:
      "Master the latest digital marketing trends and tools to grow your online presence.",
    banner: images.marketing,
    rating: 3.2,
    reviews: 89,
    provider: {
      avatar: images.avatar,
      name: "Sophia Bennett",
      skill: "Experienced Photographer",
    },
  },
  {
    title: "Graphic Design Fundamentals",
    description:
      "Discover the principles of graphic design and create visually appealing content.",
    banner: images.graphic,
    rating: 1.2,
    reviews: 45,
    provider: {
      avatar: images.avatar,
      name: "Sophia Bennett",
      skill: "Experienced Photographer",
    },
  },
];
