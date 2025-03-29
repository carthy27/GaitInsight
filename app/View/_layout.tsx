import { Tabs } from "expo-router";
import DashboardScreen from "./Dashboard";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Tabs.Screen name="Dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="Register" options={{ title: "Register", headerShown: false  }} />
    </Tabs>
  );
};

export default TabsLayout;