import AuthBG from "@/assets/images/Auth-BG.png";
import avatar from "@/assets/images/skills-constant/avatar.png";
import graphic from "@/assets/images/skills-constant/graphic.png";
import marketing from "@/assets/images/skills-constant/marketing.png";
import photography from "@/assets/images/skills-constant/photography.png";
import userProfile from "@/assets/images/skills-constant/user.png";
import writting from "@/assets/images/skills-constant/writting.png";
import Entypo from "@expo/vector-icons/Entypo";
import uploadProfile from "@/assets/images/upload-profile.png";

export const images = {
  AuthBG,
  photography,
  graphic,
  writting,
  marketing,
  avatar,
  userProfile,
  uploadProfile,
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

export const defaultUser = {
  avatar: images.userProfile,
  profession: "Full Stack Developer",
  joined: "2025",
  name: "Developer JRTS",
  skillsWanted: [
    {
      title: "Photography",
      icon: <Entypo name="camera" size={24} color="black" />,
    },
    {
      title: "Music",
      icon: <Entypo name="music" size={24} color="black" />,
    },
    {
      title: "Art",
      icon: <Entypo name="round-brush" size={24} color="black" />,
    },
  ],
  rating: 4.5,
  skillsOffered: [
    {
      title: "Coding",
      icon: <Entypo name="code" size={24} color="black" />,
    },
    {
      title: "Writting",
      icon: <Entypo name="pencil" size={24} color="black" />,
    },
    {
      title: "Public Speaking",
      icon: <Entypo name="tv" size={24} color="black" />,
    },
  ],
};
