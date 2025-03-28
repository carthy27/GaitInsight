import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="About" options={{ title: "About" }} />
        <Stack.Screen name="Register" options={{ title: "Register" }} />
      </Stack>
    </AuthProvider>
  );
}