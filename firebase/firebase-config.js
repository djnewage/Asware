// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJYyFpFY6YJ0VXvGoNkxoVif23KRDnFeA",
  authDomain: "aswareapp.firebaseapp.com",
  projectId: "aswareapp",
  storageBucket: "aswareapp.appspot.com",
  messagingSenderId: "707532441966",
  appId: "1:707532441966:web:3f721b2d5b9e310001d97f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)