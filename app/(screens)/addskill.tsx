import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import TextField from "@/components/TextField";
import { useAuth } from "@/context/AuthContext";
import CategoryPicker from "@/components/CategoryPicker";
import { hosted_url } from "@/constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const AddSkill = () => {
  const { user } = useAuth();

  const [skillTitle, setSkillTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pick image & convert to base64
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setBanner(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleAddSkill = async () => {
    if (!banner || !skillTitle || !description || !category) {
      alert("Please fill all fields and upload a banner");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    try {
      setLoading(true);

      const request = await fetch(`${hosted_url}/skill/add-skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: banner,
          title: skillTitle,
          description,
          category,
        }),
      });

      const response = await request.json();

      console.log(response);

      if (response.status) {
        router.push("/(tabs)");
      } else {
        Alert.alert("Error", response.mssage);
      }
    } catch (error: any) {
      alert("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="p-4">
      <View className="flex-col gap-4">
        {/* Banner Upload */}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-white h-64 rounded-xl items-center justify-center"
        >
          {banner ? (
            <Image
              source={{ uri: banner }}
              className="w-full h-full rounded-xl"
            />
          ) : (
            <Text className="text-gray-500">+ Upload Banner</Text>
          )}
        </TouchableOpacity>

        {/* Skill Title */}
        <TextField
          label="Skill Title"
          onChange={setSkillTitle}
          value={skillTitle}
          type="default"
        />

        {/* Description */}
        <TextField
          label="Description"
          onChange={setDescription}
          value={description}
          type="default"
          multiline
        />

        <CategoryPicker selectedCategory={category} onChange={setCategory} />

        {/* Provider Details */}
        <View className="flex-col gap-2">
          <Text className="font-medium text-text3">Provider Details</Text>
          <View className="flex-row bg-white p-4 rounded-md gap-4 items-center">
            <Image
              source={{ uri: user?.avatar.url }}
              className="w-16 h-16 rounded-full"
            />
            <View className="flex-col">
              <Text className="font-bold text-text2 text-lg">{user?.name}</Text>
              <Text className="text-gray-500">{user?.profession}</Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          disabled={loading}
          onPress={handleAddSkill}
          className="bg-[#571AE5] py-4 rounded-xl items-center mt-4"
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={"large"} />
          ) : (
            <Text className="text-white font-bold text-lg">Add Skill</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddSkill;
