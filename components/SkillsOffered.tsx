// SkillsOffered.tsx
import { useAuth } from "@/context/AuthContext";
import { hosted_url, local_url_tow } from "@/constant/url";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import SkillCard from "./SkillCard";

interface Skill {
  _id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  banner: {
    url: string;
    public_id: string;
  };
}

const SkillsOffered = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserSkills();
  }, [user]);

  const fetchUserSkills = async () => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const request = await fetch(`${hosted_url}/skill/get-skills`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await request.json();

      console.log({ response });

      if (response.status) {
        setSkills(response.skills);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSkillDetail = (skillId: string) => {
    router.push(`/(screens)/skills/${skillId}`);
  };

  if (loading) {
    return (
      <View className="flex-col gap-2">
        <Text className="text-[18px] font-bold">Skills Offered</Text>
        <View className="flex items-center justify-center h-[100px]">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-col gap-2">
      <Text className="text-[18px] font-bold">Skills Offered</Text>
      <FlatList
        data={skills}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SkillCard item={item} />}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center h-[100px]">
            <Text className="font-medium text-lg text-center">
              There are no skills offered
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SkillsOffered;
