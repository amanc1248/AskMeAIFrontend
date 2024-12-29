import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  console.error('Environment variables not loaded:', process.env);
  throw new Error('Firebase configuration environment variables are missing');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 