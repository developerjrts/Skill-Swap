import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  return (
    <TouchableOpacity
    onPress={() => router.push("/(tabs)/search")}
    className="w-full flex-row gap-2 bg-secondary px-4 py-6 rounded-lg">
      <Feather name="search" size={24} color="#634F96" />
      <Text className="text-text3 text-[18px]">Search</Text>
    </TouchableOpacity>
  );
};

export default SearchBar;
