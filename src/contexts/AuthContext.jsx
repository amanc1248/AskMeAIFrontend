import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';
import axios from '../utils/axios';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const findOrCreateUser = async (firebaseUser) => {
    try {
      // First try to find the user by email
      const findResponse = await axios.get(`/api/users/email/${firebaseUser.email}`);
      if (findResponse.data) {
        // User exists, return existing user
        localStorage.setItem('userId', findResponse.data._id);
        return findResponse.data;
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        throw error;
      }
      // If 404, user doesn't exist, continue to create new user
    }

    // Create new user if not found
    const createResponse = await axios.post('/api/users', {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
    });
    
    localStorage.setItem('userId', createResponse.data._id);
    return createResponse.data;
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Add these options to force account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      return await findOrCreateUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userId');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await findOrCreateUser(user);
        } catch (error) {
          console.error('Error handling auth state change:', error);
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 