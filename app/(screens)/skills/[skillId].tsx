import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { hosted_url } from "@/constant/url";
import { Skill } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const SkillPage = () => {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(false);

  const { skillId } = useLocalSearchParams();

  const getSkill = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const request = await fetch(`${hosted_url}/skill/get-skill/${skillId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await request.json();
      setLoading(false);
      setSkill(response.skill);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!skill) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text>Something went wrong.</Text>
      </View>
    );
  }

  const handleOfferSkillPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const request = await fetch(
        `${hosted_url}/user/skills-offered/${skillId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await request.json();

      if (response.status) {
        const userData = await AsyncStorage.getItem("user");
        let currentUser = userData ? JSON.parse(userData) : {};

        currentUser.skillsOffered = response.skillsOffered;

        await AsyncStorage.setItem("user", JSON.stringify(currentUser));

        router.push("/(tabs)/(profile)");
      } else {
        Alert.alert("Error", response.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add skill. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1  gap-2 bg-white">
      <View className="px-4 py-2 flex-col gap-6">
        <View className="w-full h-[280px] rounded-xl overflow-hidden">
          <Image
            source={{
              uri: skill?.banner?.url || "https://via.placeholder.com/300x200",
            }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <Text className="text-text2 font-bold text-[24px]">{skill?.title}</Text>
        <Text className="text-[18px] text-text3 font-normal">
          {skill?.description}
        </Text>

        {/* Rating */}
        <View className="flex-col gap-4">
          <Text className="font-extrabold text-[36px]">{skill?.rating}</Text>
          <View className="flex-row gap-1">
            {[...Array(5)].map((_, index) => (
              <AntDesign
                key={index}
                name={index < Math.round(skill?.rating || 0) ? "star" : "staro"}
                size={24}
                color="#571AE5"
              />
            ))}
          </View>
          <Text className="text-[16px]">{skill?.reviewsCount} reviews</Text>
        </View>

        {/* Provider */}
        <View className="flex-col gap-4">
          <Text className="text-text2 font-bold text-[24px]">Creator</Text>
          <View className="flex-row gap-6">
            <Image
              source={{
                uri:
                  skill?.creator?.avatar?.url ||
                  "https://via.placeholder.com/100",
              }}
              resizeMode="cover"
              className="w-24 h-24 rounded-full"
            />
            <View className="justify-center gap-1 flex-col">
              <View className="flex-row gap-2 items-center">
                <Text className="text-[16px] font-bold">
                  {skill?.creator?.name}
                </Text>
                <MaterialIcons name="verified" size={24} color="#571AE5" />
              </View>
              <Text className="text-[14px] font-medium text-text3">
                {skill?.creator?.profession}
              </Text>
            </View>
          </View>
        </View>

        <Button className="">Request Swap</Button>
        <Button
          className="mb-20"
          type="secondary"
          onPress={handleOfferSkillPress}
        >
          Offer Skill
        </Button>
      </View>
    </ScrollView>
  );
};

export default SkillPage;
