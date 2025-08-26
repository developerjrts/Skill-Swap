import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

interface props {
  type?: "primary" | "secondary";
  onPress?: () => void;
  children?: ReactNode;
  className?: string;
}

const Button = ({ type = "primary", onPress, children, className }: props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 min-w-[350px] rounded-md ${type === "primary" ? "bg-primary" : "bg-secondary "} ${className}`}
    >
      <Text
        className={` font-bold text-[18px] text-center ${type === "primary" ? " text-text" : " text-text2"}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
