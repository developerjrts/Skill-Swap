import Button from "@/components/Button";
import { images } from "@/constant";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white gap-10">
      <Image source={images.AuthBG} className="w-full h-2/5" />
      <View className="flex flex-col gap-4 px-12">
        <Text className="text-text2 font-bold text-[28px] text-center">
          Welcome to SkillSwap
        </Text>
        <Text className="font-normal text-[16px] text-center">
          Learn from peers, teach what you know, and grow together.
        </Text>
        <Button className="mt-10" onPress={() => router.push("/sign-in")}>
          Sign In
        </Button>
        <Button type="secondary" onPress={() => router.push("/sign-up")}>
          Sign Up
        </Button>
        <Button type="secondary" onPress={() => router.push("/(tabs)/")}>
          Home
        </Button>
      </View>
    </View>
  );
}
