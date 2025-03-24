import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALmxDpmrjr4FdKTdWYKx7QPxfucmFX3xE",
  authDomain: "fir-website-f31b0.firebaseapp.com",
  projectId: "fir-website-f31b0",
  storageBucket: "fir-website-f31b0.firebasestorage.app",
  messagingSenderId: "1079140185376",
  appId: "1:1079140185376:web:b13820b2b27d3167c39345"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider();
export default app