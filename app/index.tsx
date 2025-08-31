import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function SplashScreen() {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const sloganOpacity = useRef(new Animated.Value(0)).current;

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      router.replace("/(tabs)");
    } else {
      router.replace("/welcome");
    }
  };

  useEffect(() => {
    // Main animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After main logo animation, show slogan
      Animated.timing(sloganOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Wait a little so user can see the slogan, then check auth
      setTimeout(() => {
        checkAuth();
      }, 1200); // adjust delay if you want longer
    });

    // Pulse and shimmer loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  return (
    <View className="flex-1 items-center justify-center bg-purple-700">
      <Animated.View
        style={{
          transform: [{ scale }, { scale: pulse }],
          opacity,
        }}
      >
        <Animated.Text
          style={{ opacity: shimmerOpacity }}
          className="text-white text-3xl md:text-5xl font-bold tracking-wide text-center"
        >
          Developer JRTS's SkillSwap
        </Animated.Text>
      </Animated.View>

      <Animated.Text
        style={{
          opacity: sloganOpacity,
          marginTop: 20,
        }}
        className="text-white text-lg italic tracking-wider text-center"
      >
        We create emotions
      </Animated.Text>
    </View>
  );
}
