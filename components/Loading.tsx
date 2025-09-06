import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size={"large"} color={"#571AE5"} />
    </View>
  );
};

export default Loading;
