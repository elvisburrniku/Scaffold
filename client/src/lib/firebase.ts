
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyANp6HDBbbnQL73E_Ie3_GgsqbP0CfjgVM",
  authDomain: "scaffold-5da31.firebaseapp.com",
  projectId: "scaffold-5da31",
  storageBucket: "scaffold-5da31.firebasestorage.app",
  messagingSenderId: "501951869556",
  appId: "1:501951869556:web:1465fffb71da1cca22d721"
};

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log(firebaseConfig, import.meta.env);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
