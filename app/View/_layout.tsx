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
      <Stack.Screen name="Dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="Register" options={{ title: "Register" }} />
    </Stack>
  );
};

export default StackLayout;