import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";
import React, { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import type { AuthContextType } from "../types/@types.auth";
import { createNewCollectionDocs } from "../helpers/firestore";
import { useRouter } from "next/router";

// This is the context that is used to access the auth state
const AuthContextProvider = React.createContext<AuthContextType | null>(null);

// This is the hook that is used to access the auth state
export function useAuthContext() {
  const context = useContext(AuthContextProvider);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}

// This is the component that provides the auth state to its children
function AuthContext({ children }: { children: ReactNode }): JSX.Element {
  // The auth state is stored in the auth state variable
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // router is used to redirect to the user's profile page
  const router = useRouter();

  // This is the effect that is used to fetch the current user
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  // signInWithEmailAndPassword is used to sign in with an email and password and add a display name
  const signup = async (
    auth: Auth,
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!, {
        displayName,
      });
      await createNewCollectionDocs(auth.currentUser!.uid);
      router.push(`/user/${auth.currentUser!.displayName}`);
    } catch (error) {
      alert("something went wrong");
    }
  };

  // login with email and password
  const login = async (auth: Auth, email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`${auth.currentUser!.displayName}`);
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  // logout function is used to logout a user
  const logout = async (auth: Auth) => {
    await signOut(auth);
    router.push("/");
  };

  const value: AuthContextType | any = {
    currentUser,
    signup,
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
