import { AuthProvider } from "@/context/AuthContext";
import "@/global.css";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
    </AuthProvider>
  );
}
