import SearchBar from "@/components/SearchBar";
import SkillCard from "@/components/SkillCard";
import { skills } from "@/constant";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={skills}
        renderItem={({ item, index }) => (
          <SkillCard key={index} index={index} item={item} />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <View className="px-5">
            <SearchBar />
          </View>
        }
        contentContainerClassName="pb-28"
      />
    </SafeAreaView>
  );
};

export default Home;
