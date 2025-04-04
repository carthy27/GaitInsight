import React from 'react';
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="/(auth)/Register" options={{ headerShown: false }} />
        <Stack.Screen name="/(auth)/Login" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}