import { auth } from './firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    UserCredential 
} from 'firebase/auth';

export interface AuthModel {
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signOut: () => Promise<void>;
}

export const authModel: AuthModel = {
    signIn: async (email: string, password: string) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    },

    signUp: async (email: string, password: string) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    },

    signOut: async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            throw error;
        }
    }
};