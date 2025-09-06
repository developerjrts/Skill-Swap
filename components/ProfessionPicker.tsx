// components/ProfessionPicker.tsx
import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ProfessionPickerProps {
  selectedProfession: string;
  onChange: (value: string) => void;
}

const professions = [
  "Software Developer",
  "Web Developer",
  "Mobile Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "Project Manager",
  "Quality Assurance",
  "System Administrator",
  "Network Engineer",
  "Database Administrator",
  "Security Analyst",
  "Cloud Architect",
  "AI/ML Engineer",
  "Game Developer",
  "Technical Writer",
  "Student",
  "Teacher/Educator",
  "Freelancer",
  "Entrepreneur",
  "Other",
];

const ProfessionPicker = ({
  selectedProfession,
  onChange,
}: ProfessionPickerProps) => {
  return (
    <View className="bg-white rounded-md">
      <Text className="px-2 pt-2 text-text3 font-medium">Profession</Text>
      <Picker
        selectedValue={selectedProfession}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        <Picker.Item label="Select your profession" value="" />
        {professions.map((profession) => (
          <Picker.Item
            color="#000"
            key={profession}
            label={profession}
            value={profession}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ProfessionPicker;
