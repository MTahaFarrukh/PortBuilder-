import { create } from 'zustand';
import { AuthState, User } from '../types';
import { auth, db } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
  set({ isLoading: true, error: null });
  try {
    // Firebase Authentication will validate credentials
    const firebaseUserCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user: firebaseUser } = firebaseUserCredential;

    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    const userData = userDoc.data();

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: userData?.name || firebaseUser.displayName || 'User',
      createdAt: userData?.createdAt || firebaseUser.metadata.creationTime || new Date().toISOString(),
    };

    const token = await firebaseUser.getIdToken();
    set({ user, token, isAuthenticated: true, isLoading: false });

  } catch (error) {
    set({ 
      error: error instanceof Error ? error.message : 'Failed to sign in', 
      isLoading: false 
    });
  }
},



 register: async (email: string, password: string, name: string) => {
  set({ isLoading: true, error: null });
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user: firebaseUser } = userCredential;

    await updateProfile(firebaseUser, { displayName: name });

    const userData = {
      name,
      email,
      password, // ⛔️ WARNING: Never store passwords in plain text in production!
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name,
      createdAt: userData.createdAt,
    };

    const token = await firebaseUser.getIdToken();
    set({ user, token, isAuthenticated: true, isLoading: false });
  } catch (error) {
    set({ 
      error: error instanceof Error ? error.message : 'Failed to register', 
      isLoading: false 
    });
  }
},



  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: userData?.name || firebaseUser.displayName || 'User',
            createdAt: userData?.createdAt || firebaseUser.metadata.creationTime || new Date().toISOString(),
          };
          
          set({ user, token, isAuthenticated: true, isLoading: false });
        } else {
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
        unsubscribe();
        resolve();
      });
    });
  },

  clearError: () => {
    set({ error: null });
  }
}));