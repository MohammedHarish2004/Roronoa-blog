// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zoro-blog.firebaseapp.com",
  projectId: "zoro-blog",
  storageBucket: "zoro-blog.appspot.com",
  messagingSenderId: "660224462476",
  appId: "1:660224462476:web:a31798acedb1da8db175a9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);