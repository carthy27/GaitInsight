/// <reference types="react/canary" />

import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Model/firebase';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to home screen
        router.replace('/(screens)/home');
      } else {
        // No user is signed in, navigate to login screen
        router.replace('/(screens)/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return <ActivityIndicator />;
}
