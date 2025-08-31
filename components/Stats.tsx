import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Stats = () => {
  return (
    <View className="flex-row justify-center gap-4 ">
      <TouchableOpacity className="border-[#c4c4c4] border rounded-lg p-4 w-[100px] items-center justify-center">
        <Text className="text-[18px] font-bold text-text2">{0}</Text>
        <Text className="text-[14px] font-medium text-center text-text3">
          Rating
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="border-[#c4c4c4] border rounded-lg p-4 w-[100px] items-center justify-center">
        <Text className="text-[18px] font-bold text-text2">{0}</Text>
        <Text className="text-[14px] font-medium text-center text-text3">
          Skills Offered
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="border-[#c4c4c4] border rounded-lg p-4 w-[100px] items-center justify-center">
        <Text className="text-[18px] font-bold text-text2">{0}</Text>
        <Text className="text-[14px] font-medium text-center text-text3">
          Skills Wanted
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
