import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB36flxq6SizP8bT032bLNl2YxssCxJzMY",
  authDomain: "contact-book-assignment-e9774.firebaseapp.com",
  projectId: "contact-book-assignment-e9774",
  storageBucket: "contact-book-assignment-e9774.firebasestorage.app",
  messagingSenderId: "733956198587",
  appId: "1:733956198587:web:d12cf482fa6f1a876d599a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database) and export it
export const db = getFirestore(app);