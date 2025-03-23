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
		name="index" 
		options={{ 
			title: "Sign In",
			headerShown: false 
		}} 
		/>
		<Stack.Screen 
		name="(screens)/About" 
		options={{ 
			headerShown: false 
		}} 
		/>
		<Stack.Screen 
		name="(screens)/Register" 
		options={{ 
			headerShown: false 
		}} 
		/>
		<Stack.Screen 
		name="(screens)/About" 
		options={{ 
			headerShown: false 
		}} 
		/>
		</Stack>
		</AuthProvider>
	);
}