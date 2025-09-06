import SkillCard from "@/components/SkillCard";
import { hosted_url } from "@/constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skill } from "../(screens)/skills/[skillId]";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const getSkills = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const request = await fetch(`${hosted_url}/skill/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await request.json();
      setSkills(response.skills);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSkills();
  });

  const handleRefresh = () => {
    setRefreshing(true);

    getSkills();

    setRefreshing(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (skills.length < 1) {
    return <Error />;
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={skills}
        renderItem={({ item, index }) => (
          <View key={index} className="px-2">
            <SkillCard item={item} />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <View className="px-5">
            <FontAwesome6 name="filter" size={24} color="black" />
          </View>
        }
        contentContainerClassName="pb-28"
        ListEmptyComponent={() => <Error />}
      />
    </SafeAreaView>
  );
};

export default Home;
