import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Model/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { router } from 'expo-router';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import AuthController from '../Controller/AuthController/authController';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  error: null
});

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use the custom hook
  const { signInWithGoogle, error: googleError } = useGoogleAuth();

  useEffect(() => {
    if (googleError) {
      setError(googleError);
    }
  }, [googleError]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Handle navigation based on auth state
      if (user) {
        // User is signed in, navigate to the main app
        router.push('/View/About'); // Use correct path
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      // Don't navigate here - the navigation will happen automatically 
      // in the onAuthStateChanged listener which is more reliable
    } catch (error: any) {
      setError(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    const result = await AuthController.handleSignOut();
    if (result.success) {
      router.push('/'); // Navigate to home
    } else {
      setError(result.error || 'Sign out failed');
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);