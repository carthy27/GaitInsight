import React from "react";
import { StyleSheet } from "react-native"; // Import StyleSheet from react-native
import Index from "."; // Import the Index component

export default function App() {
  return <Index />; // Render the Index component
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});