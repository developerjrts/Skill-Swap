import React from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";

interface props {
  value?: string;
  onChange?: (text: string) => void;
  label?: string;
  type?: KeyboardTypeOptions;
}

const TextField = ({ label, onChange, value, type = "default" }: props) => {
  return (
    <TextInput
      className="bg-secondary p-4 py-6 font-bold text-[20px] min-w-[350px] rounded-md text-primary"
      value={value}
      placeholder={label}
      onChangeText={onChange}
      placeholderTextColor={"#571AE5"}
      keyboardType={type}
    />
  );
};

export default TextField;
