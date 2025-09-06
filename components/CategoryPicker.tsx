import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface CategoryPickerProps {
  selectedCategory: string;
  onChange: (value: string) => void;
}

const categories = [
  "Select Category",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Photography",
  "Cooking",
  "Language Learning",
  "Music",
  "Other",
];

const CategoryPicker = ({
  selectedCategory,
  onChange,
}: CategoryPickerProps) => {
  return (
    <View className="bg-secondary rounded-md">
      <Text className="px-2 pt-2 text-text3 font-medium">Category</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => onChange(itemValue)}
        className="bg-white"
      >
        {categories.map((category) => (
          <Picker.Item
            color="#000"
            key={category}
            label={category}
            value={category}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CategoryPicker;
