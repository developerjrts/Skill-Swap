// import { user } from "@/constant";
import { defaultUser } from "@/constant";
import { User } from "@/types";
import React from "react";
import { Image, Text, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface props {
  user: User | null;
}

const ProfileCard = ({ user }: props) => {
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

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
      <View className="flex-row items-center">
        <Text className="text-text2 flex-row  text-[24px] font-bold">
          {user?.name}
        </Text>
        {user?.isAdmin && (
          <MaterialIcons name="verified" size={24} color="#571AE5" />
        )}
      </View>

      <Text className="text-text3 text-[18px] font-medium">
        {user?.profession}
      </Text>
      <Text className="text-text3 text-[16px] font-medium">
        Joined {joinDate}
      </Text>
    </View>
  );
};

export default ProfileCard;
