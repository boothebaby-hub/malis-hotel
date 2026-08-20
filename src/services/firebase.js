import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvkgpWEt4ja8LbRXpyC40p8ugNXTgNyRo",
  authDomain: "my-hotel-web.firebaseapp.com",
  projectId: "my-hotel-web",
  storageBucket: "my-hotel-web.firebasestorage.app",
  messagingSenderId: "1040161793449",
  appId: "1:1040161793449:web:217dad2d8c0abb657e50b8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;