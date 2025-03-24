import { Text } from 'react-native';
import React from 'react';
export default function renderInfo({ name }: { name: string }) {
  // Securely fetch data from an API, and read environment variables...
  return <Text>Hello, {name}!</Text>;
}
