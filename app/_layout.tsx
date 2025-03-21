import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="(screens)/About" options={{ title: "About" }} />
      <Stack.Screen name="(screens)/Register" options={{ title: "Register" }} />
    </Stack>
  );
};

export default StackLayout;