import { Stack } from "expo-router";
import React from "react";

const ScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="skills/[skillId]"
        options={{
          title: "Skill Details",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default ScreensLayout;
