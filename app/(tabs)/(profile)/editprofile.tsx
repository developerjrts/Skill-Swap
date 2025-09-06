import Button from "@/components/Button";
import ProfessionPicker from "@/components/ProfessionPicker";
import TextField from "@/components/TextField";
import { hosted_url } from "@/constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { User } from "@/types";
const UpdateProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("other");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);

          setName(parsedUser.name || "");
          setProfession(parsedUser.profession || "");
          setBio(parsedUser.bio || "");
          setGender(parsedUser.gender || "other");
          setGithub(parsedUser.socialLinks?.github || "");
          setLinkedin(parsedUser.socialLinks?.linkedin || "");
          setInstagram(parsedUser.socialLinks?.instagram || "");
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      const request = await fetch(`${hosted_url}/user/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          profession,
          bio,
          gender,
          socialLinks: { github, linkedin, instagram },
        }),
      });

      const response = await request.json();

      if (response.status) {
        Alert.alert("Success", "Profile updated successfully!");
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
      } else {
        Alert.alert("Error", response.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      className="flex-1"
    >
      <ScrollView
        className="p-6 "
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-col gap-4 pb-60">
          <TextField label="Name" value={name} onChange={setName} />

          <ProfessionPicker
            selectedProfession={profession}
            onChange={setProfession}
          />

          <TextField label="Bio" value={bio} onChange={setBio} multiline />

          <Text className="text-text3 font-medium">Gender</Text>
          <View className="bg-white rounded-md">
            <Picker
              selectedValue={gender}
              onValueChange={(val) => setGender(val)}
              className="bg-white"
            >
              <Picker.Item color="#000" label="Male" value="male" />
              <Picker.Item color="#000" label="Female" value="female" />
              <Picker.Item color="#000" label="Other" value="other" />
            </Picker>
          </View>

          <Text className="text-text3 font-medium">Social Links</Text>
          <TextField label="GitHub" value={github} onChange={setGithub} />
          <TextField
            label="Instagram"
            value={instagram}
            onChange={setInstagram}
          />
          <TextField label="LinkedIn" value={linkedin} onChange={setLinkedin} />

          <Button onPress={handleUpdate}>
            {loading ? (
              <ActivityIndicator color={"#fff"} size={"large"} />
            ) : (
              "Update Info"
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;
