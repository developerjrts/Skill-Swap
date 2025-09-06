import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Skill {
  _id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  banner: {
    url: string;
    public_id: string;
  };
}

interface props {
  item: Skill;
}

const SkillCard = ({ item }: props) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(screens)/skills/${item._id}`)}
      className="flex flex-row w-full bg-white max-h-[150px] px-6 border-b border-b-[gray]i"
    >
      <View className="w-[65%] flex-col gap-2 justify-center py-8">
        <Text className="font-bold text-[18px] text-text2">{item.title}</Text>
        <Text className="font-normal text-[14px] text-text3">
          {item.description.length > 65
            ? item.description.slice(0, 65) + "..."
            : item.description}
        </Text>
      </View>

      <Image
        source={{ uri: item.banner.url }}
        className="w-[35%] h-full rounded-md"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default SkillCard;
