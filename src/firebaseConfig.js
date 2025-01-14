// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore 추가

const firebaseConfig = {
  apiKey: "AIzaSyDSUbpAhxK2GwvH6SyroRHlw8EOhTTEH8s",
  authDomain: "modeogta-b54db.firebaseapp.com",
  projectId: "modeogta-b54db",
  storageBucket: "modeogta-b54db.appspot.com",
  messagingSenderId: "524539897894",
  appId: "1:524539897894:web:205f85b0e23d29275edee7",
  measurementId: "G-XG4QH2B2F6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 초기화

export { app, analytics, db };
