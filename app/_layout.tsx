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
        }, headerShown: false 
      }}>
        <Stack.Screen name="index" options={{ title: "Sign In", headerShown: false  }} />
        <Stack.Screen name="View/Dashboard" options={{ title: "Dashboard", headerShown: false  }} />
        <Stack.Screen name="View/Register" options={{ title: "Register", headerShown: false  }} />
      </Stack>
    </AuthProvider>
  );
}