import React, { useState, useEffect } from "react";
import {
  User,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { auth } from "@js/utilities/firebase";

interface Props {
  children: React.ReactNode;
}

interface AuthContext {
  currentUser: User | null;
  signUp: (email: string, password: string) => void;
  login: (email: string, password: string, rememberMe: boolean) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
  signInWithGoogle: () => void;
  addUserDisplayName: (name: string) => void;
}

const AuthContext = React.createContext<AuthContext>({
  currentUser: null,
  signUp: () => {},
  login: () => {},
  logout: () => {},
  resetPassword: () => {},
  signInWithGoogle: () => {},
  addUserDisplayName: () => {},
});

export const AuthProvider: React.FC<Props> = (props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email: string, password: string, rememberMe: boolean) {
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );

    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }

  function addUserDisplayName(name: string) {
    if (auth.currentUser)
      return updateProfile(auth.currentUser, {
        displayName: name,
      });
  }

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    addUserDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
