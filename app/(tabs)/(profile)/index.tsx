import ProfileCard from "@/components/ProfileCard";
import SkillsOffered from "@/components/SkillsOffered";
import SkillsWanted from "@/components/SkillsWanted";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
  Text,
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hosted_url } from "@/constant/url";
import { User } from "@/types";

const Profile = () => {
  const data: any[] = [];
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          const token = await AsyncStorage.getItem("token");

          if (!token) {
            console.warn("No token found in storage");
            setUser(null);
            return;
          }

          const request = await fetch(`${hosted_url}/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const response = await request.json();

          if (response?.status && response.user) {
            setUser(response.user);
            await AsyncStorage.setItem("user", JSON.stringify(response.user));
            console.log("User loaded from API and stored in AsyncStorage");
          } else {
            console.warn("Failed to fetch user from API");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${hosted_url}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data?.status) {
        setUser(data.user);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        console.log("Profile data refreshed");
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleSocialLinkPress = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View className="flex-col gap-8 px-6 py-10">
            <ProfileCard user={user} />

            {/* Bio Section */}
            {user?.bio && (
              <View className="bg-gray-50 p-4 rounded-lg">
                <Text className="text-lg font-semibold mb-2">About Me</Text>
                <Text className="text-gray-700">{user.bio}</Text>
              </View>
            )}

            {/* Social Links Section */}
            {(user?.socialLinks?.github ||
              user?.socialLinks?.linkedin ||
              user?.socialLinks?.instagram) && (
              <View className="bg-gray-50 p-4 rounded-lg">
                <Text className="text-lg font-semibold mb-4">Social Links</Text>
                <View className="flex-row justify-around">
                  {user.socialLinks.github && (
                    <TouchableOpacity
                      className="items-center"
                      onPress={() =>
                        handleSocialLinkPress(user.socialLinks.github)
                      }
                    >
                      <FontAwesome name="github" size={28} color="#333" />
                      <Text className="mt-1 text-sm text-gray-600">GitHub</Text>
                    </TouchableOpacity>
                  )}

                  {user.socialLinks.linkedin && (
                    <TouchableOpacity
                      className="items-center"
                      onPress={() =>
                        handleSocialLinkPress(user.socialLinks.linkedin)
                      }
                    >
                      <FontAwesome name="linkedin" size={28} color="#0077B5" />
                      <Text className="mt-1 text-sm text-gray-600">
                        LinkedIn
                      </Text>
                    </TouchableOpacity>
                  )}

                  {user.socialLinks.instagram && (
                    <TouchableOpacity
                      className="items-center"
                      onPress={() =>
                        handleSocialLinkPress(user.socialLinks.instagram)
                      }
                    >
                      <FontAwesome name="instagram" size={28} color="#1DA1F2" />
                      <Text className="mt-1 text-sm text-gray-600">
                        Instagram
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

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
