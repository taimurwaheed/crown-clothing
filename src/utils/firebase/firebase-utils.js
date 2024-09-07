import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase configuration object containing keys and identifiers for the app
const firebaseConfig = {
  apiKey: "AIzaSyC13HQ3wzOLVa_9g4hdXdvN5V5HfzH5CvM",
  authDomain: "crwn-db-82cb5.firebaseapp.com",
  projectId: "crwn-db-82cb5",
  storageBucket: "crwn-db-82cb5.appspot.com",
  messagingSenderId: "863006965902",
  appId: "1:863006965902:web:3f82638b6d485aa0d1c9df",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Initialize Firestore database and export it
export const db = getFirestore();

// Function to create a user document in Firestore from authentication data
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // Reference to the user document in Firestore
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  // Get the user document snapshot
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists()); // Check if the user exists in the database

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};
