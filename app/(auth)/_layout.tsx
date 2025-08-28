import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: "Sign Up",
        }}
      />
      <Stack.Screen
        name="profile-setup"
        options={{
          headerTitle: "Profile Setup",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
