import { user } from "@/constant";
import React from "react";
import { FlatList, Text, View } from "react-native";

const SkillsWanted = () => {
  return (
    <View className="flex-col gap-2">
      <Text className="text-[18px] font-bold">Skills Wanted</Text>
      <FlatList
        data={user.skillsWanted}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="border border-[#aaa] flex-row gap-2 p-4 items-center justify-center rounded-lg flex-1 m-1">
            {item.icon}
            <Text>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};

export default SkillsWanted;
