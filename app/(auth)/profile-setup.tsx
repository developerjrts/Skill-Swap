import Button from "@/components/Button";
import { images } from "@/constant";
import { hosted_url, local_url } from "@/constant/url";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as FileSystem from "expo-file-system";

const ProfileSetup = () => {
  const [image, setImage] = useState<string>("");
  const [base64, setBase64] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Pick from gallery
  const pickImage = async () => {
    try {
      // Request permissions first
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant camera roll permissions to upload images"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 0.8, // Reduced quality for smaller file size
        allowsEditing: true,
        aspect: [1, 1],
        base64: true, // Get base64 directly from ImagePicker
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);

        // Use the base64 from ImagePicker if available, otherwise convert
        if (result.assets[0].base64) {
          setBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
        } else {
          // Fallback conversion
          const base64Data = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setBase64(`data:image/jpeg;base64,${base64Data}`);
        }
      }
    } catch (error) {
      console.log("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const uploadAvatar = async () => {
    if (!base64) {
      Alert.alert("Error", "Please select an image first!");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Authentication token not found");
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(`${hosted_url}/user/upload-avatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: base64 }),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        Alert.alert("Success", "Profile picture uploaded successfully");
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", data.message || "Failed to upload avatar");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert("Error", error.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-white py-5 gap-6 px-5">
      {/* Avatar Picker */}
      <TouchableOpacity
        onPress={pickImage}
        className="relative justify-center rounded-xl items-center"
        activeOpacity={0.8}
      >
        <Image
          source={image ? { uri: image } : images.uploadProfile}
          style={{ width: "100%", height: 220 }}
          resizeMode="cover"
          className="rounded-xl"
        />

        {!image && (
          <>
            <View className="absolute inset-0 rounded-xl bg-black/20" />
            <MaterialIcons
              name="add-photo-alternate"
              size={48}
              color="#fff"
              style={{ position: "absolute" }}
            />
          </>
        )}
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-text2 font-bold text-[22px]">
        Add a Profile Photo
      </Text>
      <Text className="text-text3 font-medium text-[18px]">
        Upload a profile photo so other learners can recognize you.
      </Text>

      {/* Upload Button */}
      <TouchableOpacity
        onPress={uploadAvatar}
        disabled={uploading || !image}
        className={`p-4 rounded-xl justify-center items-center ${
          uploading || !image ? "bg-gray-400" : "bg-primary"
        }`}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" size={"large"} />
        ) : (
          <Text className="text-white font-bold text-[20px]">Upload</Text>
        )}
      </TouchableOpacity>

      <Button
        type="secondary"
        onPress={() => router.replace("/(tabs)")}
        className="absolute bottom-10 left-12"
      >
        Skip
      </Button>
    </View>
  );
};

export default ProfileSetup;
