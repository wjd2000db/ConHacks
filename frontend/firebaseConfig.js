import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_API_URL,
  projectId: "conhacks-47acb",
  storageBucket: "conhacks-47acb.firebasestorage.app",
  messagingSenderId: "211651582321",
  appId: "1:211651582321:web:7da6f0526a39598f5cfed0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };