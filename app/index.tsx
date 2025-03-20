import { Text, View } from "react-native";
import SignIn from "./component/SignIn";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>We are now using app ass the main file.</Text>
      <SignIn />
    </View>
  );
}
