import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Model/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import AuthController from '../Controller/AuthController/authController';
import { router } from 'expo-router';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  shouldNavigate: boolean;
  setShouldNavigate: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  error: null,
  shouldNavigate: true,
  setShouldNavigate: () => {}
});

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldNavigate, setShouldNavigate] = useState(true);
  
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
      
      // Log the navigation conditions
      console.log(`Navigation check: user=${!!user}, shouldNavigate=${shouldNavigate}, loading=${loading}`);
      
      // Try navigation if user exists and shouldNavigate is true
      if (user && shouldNavigate) {
        try {
          console.log('Attempting to navigate to About page');
          router.push('/View/About');
        } catch (error) {
          console.error('Navigation error:', error);
        }
      }
    });

    return unsubscribe;
  }, [shouldNavigate]); // Add shouldNavigate to the dependency array

  useEffect(() => {
    // If user is null (signed out) and not loading, navigate to home
    if (user === null && !loading && shouldNavigate) {
      // You can uncomment and use this if you want automatic navigation
      // router.replace('/');
    }
  }, [user, loading, shouldNavigate]);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithGoogle();
      console.log('Sign in result:', result);
      
      // If we have a user and shouldNavigate is true, navigate explicitly
      if (user && shouldNavigate) {
        console.log('Explicitly navigating after sign-in');
        setTimeout(() => {
          router.push('/View/About');
        }, 500); // Short delay to ensure state is updated
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthController.handleSignOut();
      
      if (!result.success) {
        setError(result.error || 'Sign out failed');
      }
      
      // Navigation is handled by onAuthStateChanged
      // No need to navigate manually here
    } catch (error: any) {
      setError(error.message || 'Sign out failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signOut, 
      error, 
      shouldNavigate, 
      setShouldNavigate 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);