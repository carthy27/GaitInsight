import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface SignOutButtonProps {
  readonly label?: string;
  readonly style?: object;
  readonly textStyle?: object;
  readonly onSignOutComplete?: () => void;
}

export default function SignOutButton({
  label = 'Sign Out',
  style,
  textStyle,
  onSignOutComplete
}: SignOutButtonProps) {
  const { signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    if (onSignOutComplete) onSignOutComplete();
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleSignOut}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});