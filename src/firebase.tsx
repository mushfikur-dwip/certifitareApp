// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtSkj7WdiZwuq_MebC_F8ZcITdkPpogyU",
  authDomain: "certificatelb.firebaseapp.com",
  projectId: "certificatelb",
  storageBucket: "certificatelb.firebasestorage.app",
  messagingSenderId: "103961090645",
  appId: "1:103961090645:web:995fcb76f429d164d652dc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth, provider, db};
