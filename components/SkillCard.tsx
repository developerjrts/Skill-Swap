import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Item {
  title: string;
  banner: ImageSourcePropType;
  description: string;
  
}

interface props {
  item: Item;
  index: number
}

const SkillCard = ({ item, index }: props) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(screens)/skills/${index}`)}
      className="flex flex-row w-full bg-white max-h-[150px] px-6"
    >
      <View className="w-[65%] flex-col gap-2 justify-center py-8">
        <Text className="font-bold text-[18px] text-text2">{item.title}</Text>
        <Text className="font-normal text-[14px] text-text3">
          {item.description}
        </Text>
      </View>

      <Image
        source={item.banner}
        className="w-[35%] h-full"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default SkillCard;
