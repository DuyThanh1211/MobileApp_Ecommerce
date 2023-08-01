import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAvLTZC58euXLop7SA-rbxUORai3wKGtYg",
  authDomain: "shopapp-ca1cb.firebaseapp.com",
  projectId: "shopapp-ca1cb",
  storageBucket: "shopapp-ca1cb.appspot.com",
  messagingSenderId: "1043561037355",
  appId: "1:1043561037355:web:d45f4249012bd53170746e",
  measurementId: "G-5MWNQW3F0F",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
