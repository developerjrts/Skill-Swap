import React from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";

interface Props {
  value?: string;
  onChange?: (text: string) => void;
  label?: string;
  type?: KeyboardTypeOptions;
  multiline?: boolean;
}

const TextField = ({
  label,
  onChange,
  value,
  type = "default",
  multiline = false,
}: Props) => {
  return (
    <TextInput
      className={`bg-secondary p-4 font-bold text-[20px] min-w-[350px] rounded-md text-primary ${
        multiline ? "min-h-[120px] text-top" : "py-6"
      }`}
      value={value}
      placeholder={label}
      onChangeText={onChange}
      placeholderTextColor={"#571AE5"}
      keyboardType={type}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
    />
  );
};

export default TextField;
