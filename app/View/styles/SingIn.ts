import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'Purple',
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
});

export default styles;