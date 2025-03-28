import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    UserCredential,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithPopup,
    User,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'; // Ensure this is imported for platform checks

export interface AuthModel {
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<User | null>;
    getCurrentUser: () => User | null;
    subscribeToAuthChanges: (callback: (user: User | null) => void) => () => void;
}

export const authModel: AuthModel = {
    signIn: async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
            return userCredential;
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    },

    signUp: async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
            return userCredential;
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    },

    signOut: async () => {
        try {
            await firebaseSignOut(auth);
            await AsyncStorage.removeItem('user');
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    },

    signInWithGoogle: async () => {
        try {
            const provider = new GoogleAuthProvider();
            if (Platform.OS === 'web') {
                // Use signInWithPopup for web
                const userCredential = await signInWithPopup(auth, provider);
                console.log('Signed in as:', userCredential.user.displayName);
                await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
                return userCredential.user;
            } else {
                // Use credential-based sign-in for mobile
                throw new Error('Google sign-in is not implemented for this platform.');
            }
        } catch (error: any) {
            console.error('Error during Google sign-in:', error.message);
            throw error;
        }
    },

    getCurrentUser: () => {
        return auth.currentUser;
    },

    subscribeToAuthChanges: (callback: (user: User | null) => void) => {
        return onAuthStateChanged(auth, callback);
    }
};