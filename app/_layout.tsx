import React from 'react';
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
        <Stack 
        screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
        >
        <Stack.Screen 
        name="./View/Register" 
        options={{ 
            title: "Register",
            headerShown: false 
        }} 
        />
        <Stack.Screen 
        name="./View/About" 
        options={{ 
            headerShown: false 
        }} 
        />
        </Stack>
        </AuthProvider>
    );
}