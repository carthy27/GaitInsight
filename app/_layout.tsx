import React from 'react';
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="index" options={{ title: "Sign In" }} />
        <Stack.Screen name="View/About" options={{ title: "About" }} />
        <Stack.Screen name="View/Register" options={{ title: "Register" }} />
      </Stack>
    </AuthProvider>
  );
}