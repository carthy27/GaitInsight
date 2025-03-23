import { Stack } from "expo-router";

const StackLayout = () => {
  return (
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
      <Stack.Screen name="(screens)/About" options={{ title: "About" }} />
      <Stack.Screen name="(screens)/Register" options={{ title: "Register" }} />
    </Stack>
  );
};

export default StackLayout;