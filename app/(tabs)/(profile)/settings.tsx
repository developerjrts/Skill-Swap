import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { FlatList, Switch, Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
  const [isEnable, setIsEnable] = useState(false);

  const settings = [
    {
      icon: <Ionicons name="notifications-outline" size={24} color="black" />,
      title: "Notifications",
      description: "Manage your notifications",
    },
    {
      icon: (
        <Ionicons name="shield-checkmark-outline" size={24} color="black" />
      ),
      title: "Privacy",
      description: "Control your privacy settings",
    },
    {
      icon: <Ionicons name="moon-outline" size={24} color="black" />,
      title: "Dark Mode",
      description: "Switch to dark mode",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={settings}
        renderItem={({ item }) => (
          <TouchableOpacity className=" flex-row items-center gap-4 p-2 px-6">
            <View className="p-4 bg-secondary rounded-lg">{item.icon}</View>
            <View className="flex-1">
              <Text className="text-[16px] font-bold">{item.title}</Text>
              <Text className="text-[14px] text-text3">{item.description}</Text>
            </View>
            <Switch
              value={isEnable}
              onValueChange={() => setIsEnable(!isEnable)}
              trackColor={{ false: "#767577", true: "#634F96" }}
              thumbColor={isEnable ? "#571AE5" : "#f4f3f4"}
              style={{
                transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Settings;
