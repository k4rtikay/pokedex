

import { initializeApp } from "firebase/app";

import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyBkZGjV2b8z6noIjC9OgGj-1kyIDdFduaQ",

  authDomain: "pokebook-4a5b8.firebaseapp.com",

  projectId: "pokebook-4a5b8",

  storageBucket: "pokebook-4a5b8.firebasestorage.app",

  messagingSenderId: "91802070258",

  appId: "1:91802070258:web:aa45011c0fe7faaa94b46b",

  measurementId: "G-7P7VRFWVPF"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()