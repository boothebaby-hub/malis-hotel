import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    setUser(firebaseUser);
    if (firebaseUser) {
      try {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        setProfile(snap.exists() ? snap.data() : null);
      } catch (err) {
        console.error("Failed to load user profile:", err);
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
    setLoading(false);
  });
  return unsubscribe;
}, []);

  async function register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const userDoc = {
      name,
      email,
      role: "guest",
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", cred.user.uid), userDoc);
    setProfile(userDoc);
    return cred.user;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === "admin",
    register,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
