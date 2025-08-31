// import { user } from "@/constant";
import { defaultUser } from "@/constant";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <View className="flex-col gap-2 items-center">
      {user?.avatar ? (
        <Image
          source={{ uri: user.avatar.url }}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
          className="rounded-full"
        />
      ) : (
        <Image
          source={defaultUser.avatar}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
          className="rounded-full"
        />
      )}

      <Text className="text-text2 text-[24px] font-bold">{user?.name}</Text>
      <Text className="text-text3 text-[18px] font-medium">{"Profession"}</Text>
      <Text className="text-text3 text-[16px] font-medium">Joined 2025</Text>
    </View>
  );
};

export default ProfileCard;
