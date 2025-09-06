import { User } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  label: string;
  icon: string;
}

const TabBarIcon = ({ focused, label, icon }: TabBarIconProps) => (
  <View className="items-center">
    <Ionicons
      name={focused ? icon : `${icon}-outline`}
      size={24}
      color={focused ? "#120D1C" : "#9ca3af"}
    />
  </View>
);

export default function TabsLayout() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUser();
  }, []);

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 4,
            paddingTop: 10,
            paddingBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} label="Home" icon="home" />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} label="Search" icon="search" />
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} label="Chat" icon="chatbubble" />
            ),
          }}
        />

        <Tabs.Screen
          name="(profile)"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} label="Profile" icon="person" />
            ),
          }}
        />
      </Tabs>

      {user?.isAdmin && (
        <TouchableOpacity
          className="absolute bottom-24 right-5 bg-[#571AE5] p-4 rounded-full shadow-lg"
          onPress={() => router.push("/(screens)/addskill")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}
