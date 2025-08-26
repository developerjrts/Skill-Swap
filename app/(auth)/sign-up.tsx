import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          type="email-address"
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
      <Button onPress={() => router.push("/(tabs)/")}>Sign Up</Button>
      <Text className="text-center text-text2 text-2xl">OR</Text>
      <Button type="secondary" onPress={() => router.push("/sign-in")}>
        Sign In
      </Button>
    </View>
  );
};

export default SignUp;
