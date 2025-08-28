import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { hosted_url } from "@/constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Error", "All fields are required!");
        return;
      }

      setIsLoading(true);

      const request = await fetch(`${hosted_url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const response = await request.json();

      console.log(response);

      setIsLoading(false);

      if (!response.status) {
        Alert.alert("Error", response.message);
      }

      if (response.status) {
        await AsyncStorage.setItem("token", response.token);
        router.replace("/(auth)/profile-setup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className=" px-10 py-20 bg-white flex-1 gap-8">
      <Text className="text-left text-[24px] font-bold text-text2">
        Create your account
      </Text>
      <KeyboardAvoidingView className="gap-8">
        <TextField
          value={name}
          label="Name"
          onChange={(text) => setName(text)}
          type="default"
        />
        <TextField
          value={email}
          label="Email"
          onChange={(text) => setEmail(text)}
          type="email-address"
        />
        <TextField
          value={password}
          label="Password"
          onChange={(text) => setPassword(text)}
          type="visible-password"
        />
      </KeyboardAvoidingView>
      <Button onPress={handleRegister}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"#FFF"} />
        ) : (
          "Sign Up"
        )}
      </Button>
      <Text className="text-center text-text2 text-2xl">OR</Text>
      <Button type="secondary" onPress={() => router.push("/sign-in")}>
        Sign In
      </Button>
    </View>
  );
};

export default SignUp;
