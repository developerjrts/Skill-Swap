import Button from "@/components/Button";
import { skills } from "@/constant";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface skill {
  title: string;
  description: string;
  banner: ImageSourcePropType;
  rating: number;
  reviews: number;
  provider: {
    avatar: ImageSourcePropType;
    name: string;
    skill: string;
  };
}

const SkillPage = () => {
  const { skillId } = useLocalSearchParams();
  const skill = skills[Number(skillId)];

  return (
    <View className="flex-1 pb-28 gap-2 bg-white">
      <Image
        source={skill.banner}
        className="w-full h-[280]"
        resizeMode="contain"
      />
      <View className="px-4 py-2 flex-col gap-6">
        <Text className="text-text2 font-bold text-[24px]">{skill.title}</Text>
        <Text className="text-[18px] font-normal">{skill.description}</Text>
        <View className="flex-col gap-2">
          <Text className="font-extrabold text-[36px]">{skill.rating}</Text>
          <View className="flex-row gap-1">
            <AntDesign name="star" size={24} color="#571AE5" />
            <AntDesign name="star" size={24} color="#571AE5" />
            <AntDesign name="star" size={24} color="#571AE5" />
            <AntDesign name="star" size={24} color="#571AE5" />
            <AntDesign name="staro" size={24} color="#571AE5" />
          </View>
          <Text className="text-[16px]">{skill.reviews} reviews</Text>
        </View>
        <View className="flex-col gap-4">
          <Text className="text-text2 font-bold text-[24px]">Provider</Text>

          <View className="flex-row gap-6">
            <Image
              source={skill.provider.avatar}
              resizeMode="contain"
              className="size-24"
            />
            <View className=" justify-center gap-1 flex-col">
              <Text className="text-[16px] font-bold">
                {skill.provider.skill}
              </Text>
              <Text className="text-[14px] font-medium text-text3">
                {skill.provider.name}
              </Text>
            </View>
          </View>
        </View>
        <Button className="mt-10">Request Swap</Button>
      </View>
    </View>
  );
};

export default SkillPage;
