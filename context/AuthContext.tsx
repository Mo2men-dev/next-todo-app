import { Auth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import React, { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import type { AuthContextType } from "../@types.auth";

const AuthContextProvider = React.createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContextProvider);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}

function AuthContext({ children }: { children: ReactNode }): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (auth: Auth, email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const logout = (auth: Auth) => {
    return signOut(auth);
  };

  const value: AuthContextType | any = {
    currentUser,
    login,
    logout,
  };
  return (
    <AuthContextProvider.Provider value={value}>
      {!isLoading && children}
    </AuthContextProvider.Provider>
  );
}

export default AuthContext;
