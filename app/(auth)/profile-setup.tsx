import Button from "@/components/Button";
import { images } from "@/constant";
import { hosted_url } from "@/constant/url";
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

const ProfileSetup = () => {
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Pick from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Upload avatar to backend
  const uploadImage = async () => {
    if (!image) return Alert.alert("Error", "Please select an image first!");

    const token = await AsyncStorage.getItem("token");
    setUploading(true);

    let formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    try {
      const res = await fetch(`${hosted_url}/user/upload-avatar`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (data.status) {
        Alert.alert("Success", "Avatar uploaded!");
        router.replace("/(tabs)");
      } else {
        Alert.alert("Upload failed", data.message);
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
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
          source={image ? { uri: image } : images.uploadProfile} // show preview if selected
          style={{ width: "100%", height: 220 }}
          resizeMode="cover"
          blurRadius={image ? 0 : 2}
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
        onPress={uploadImage}
        disabled={uploading}
        className="bg-primary p-4 rounded-xl justify-center items-center"
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
