import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d1564.firebaseapp.com",
  projectId: "mern-blog-d1564",
  storageBucket: "mern-blog-d1564.appspot.com",
  messagingSenderId: "837020498663",
  appId: "1:837020498663:web:c33c8277f1f1897a6f4042"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);