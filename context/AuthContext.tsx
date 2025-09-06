// AuthContext.tsx
import { hosted_url } from "@/constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  __v: number;
  _id: string;
  avatar: {
    public_id: string;
    url: string;
  };
  gender: "male" | "female" | "other";
  bio: string;
  profession: string;
  email: string;
  interests: string[];
  name: string;
  skills: any[];
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      if (!authToken) {
        setLoading(false);
        return;
      }

      setToken(authToken);

      const request = await fetch(`${hosted_url}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const response = await request.json();

      if (response?.status) {
        setUser(response.user);
      }
    } catch (error) {
      console.log("Error loading user", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (authToken: string) => {
    await AsyncStorage.setItem("token", authToken);
    setToken(authToken);

    const request = await fetch(`${hosted_url}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const response = await request.json();
    if (response?.status) {
      setUser(response.user);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
