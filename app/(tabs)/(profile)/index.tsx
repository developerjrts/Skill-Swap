import ProfileCard from "@/components/ProfileCard";
import SkillsOffered from "@/components/SkillsOffered";
import SkillsWanted from "@/components/SkillsWanted";
import Stats from "@/components/Stats";
import { useAuth } from "@/context/AuthContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const data: any[] = [];

  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute flex-row gap-6 top-10 right-10 z-10">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(profile)/editprofile")}
        >
          <Feather name="edit-2" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(profile)/settings")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View className="flex-col gap-8 px-6 py-10">
            <ProfileCard />
            <Stats />
            <SkillsOffered />
            <SkillsWanted />
          </View>
        }
        renderItem={null}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default Profile;
