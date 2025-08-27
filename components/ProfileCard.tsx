import { user } from "@/constant";
import React from "react";
import { Image, Text, View } from "react-native";

const ProfileCard = () => {
  return (
    <View className="flex-col gap-2 items-center">
      <Image source={user.avatar} resizeMode="contain" />
      <Text className="text-text2 text-[24px] font-bold">{user.name}</Text>
      <Text className="text-text3 text-[18px] font-medium">
        {user.profession}
      </Text>
      <Text className="text-text3 text-[16px] font-medium">
        Joined {user.joined}
      </Text>
    </View>
  );
};

export default ProfileCard;
