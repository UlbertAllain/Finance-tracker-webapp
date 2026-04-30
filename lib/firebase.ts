import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYp3d4vEtq7p5pqsP2ek8PkGaIvk8U92s",
  authDomain: "finance-tracker11.firebaseapp.com",
  projectId: "finance-tracker11",
  storageBucket: "finance-tracker11.firebasestorage.app",
  messagingSenderId: "178223917686",
  appId: "1:178223917686:web:afb3f369c6c0fe6085cd57",
  measurementId: "G-N5VKHXX9H6"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);