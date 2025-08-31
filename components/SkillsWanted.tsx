import React from "react";
import { FlatList, Text, View } from "react-native";

const SkillsWanted = () => {
  const data: any[] = [];

  return (
    <View className="flex-col gap-2">
      <Text className="text-[18px] font-bold">Skills Wanted</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="border border-[#aaa] flex-row gap-2 p-4 items-center justify-center rounded-lg flex-1 m-1">
            {item.icon}
            <Text>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center h-[100px]">
            <Text className="font-medium text-2xl">
              {" "}
              There are no skills offered
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SkillsWanted;
