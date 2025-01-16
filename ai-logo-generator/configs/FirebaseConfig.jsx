// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "ai-logo-generator-c34df.firebaseapp.com",
  projectId: "ai-logo-generator-c34df",
  storageBucket: "ai-logo-generator-c34df.firebasestorage.app",
  messagingSenderId: "549640708501",
  appId: "1:549640708501:web:25b24ef52c32956759969c",
  measurementId: "G-LXKVGR84Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)