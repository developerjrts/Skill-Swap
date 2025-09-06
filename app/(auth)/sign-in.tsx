import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { hosted_url } from "@/constant/url";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "All fields are required!");
        return;
      }
      setIsLoading(true);

      const request = await fetch(`${hosted_url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const response = await request.json();
      setIsLoading(false);
      console.log(response);

      if (!response.status) {
        Alert.alert("Error", response.message);
      }

      if (response.status) {
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="px-10 py-20 bg-white flex-1 gap-8">
      <Text className="text-left text-[24px] font-bold text-text2">
        Sign-In into your account
      </Text>
      <KeyboardAvoidingView className="gap-8">
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
      <Button onPress={handleSignIn}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"#FFF"} />
        ) : (
          "Sign In"
        )}
      </Button>
      <Text className="text-center text-text2 text-2xl">OR</Text>
      <Button type="secondary" onPress={() => router.push("/sign-up")}>
        Sign Up
      </Button>
    </View>
  );
};

export default SignIn;
