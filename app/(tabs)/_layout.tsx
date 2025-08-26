import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 4,
          paddingTop: 15,
          position: "absolute",
          marginLeft: 10,
          marginRight: 10,
          bottom: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
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
        name="(profile)/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label="Profile" icon="person" />
          ),
        }}
      />
    </Tabs>
  );
}
