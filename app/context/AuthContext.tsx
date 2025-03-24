import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Model/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import AuthController from '../Controller/AuthController/authController';
import { router } from 'expo-router';


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

  // Initialize Google Auth
  const googleAuth = AuthController.initializeGoogleAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    const result = await AuthController.handleGoogleSignIn();
    if (result.success) {
      router.push('./View/(screens)/Register');
    } else {
      setError(result.error ?? 'Sign in failed');
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    const result = await AuthController.handleSignOut();
    if (result.success) {
      router.push('/');
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