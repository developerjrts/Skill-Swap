import SkillCard from "@/components/SkillCard";
import { skills } from "@/constant";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchBar = () => {
  return (
    <View className="w-full flex-row gap-2 bg-secondary px-4 items-center rounded-lg">
      <Feather name="search" size={24} color="#634F96" />
      <TextInput
        className="text-text3 font-bold flex-1 py-4 text-2xl"
        placeholder="Search Skill"
        placeholderTextColor={"#634F96"}
      />
    </View>
  );
};

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={skills}
        renderItem={({ item, index }) => (
          <SkillCard key={index} index={index} item={item} />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={<View className="px-5">{<SearchBar />}</View>}
        contentContainerClassName="pb-28"
      />
    </SafeAreaView>
  );
};

export default Search;
