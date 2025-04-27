import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailVerify = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };
  const updateUserProfile = (name, profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profile,
    });
  };
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const signInFaceBook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("current user ---->", currentUser);
      const email = currentUser?.email;
      if (currentUser?.email) {
        setUser(currentUser);
        await axiosPublic.post("/login", { email }, { withCredentials: true }); //set jwt login
      } else {
        setUser(currentUser);
        await axiosPublic.get("/logout", { withCredentials: true }); //clear jwt logout
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    emailVerify,
    updateUserProfile,
    signInGoogle,
    signInGithub,
    signInFaceBook,
    signInUser,
    resetPassword,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
