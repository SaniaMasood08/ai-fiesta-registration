// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdLIw59ArNoptnea0uoIr-8BQh_nX0JH8",
  authDomain: "ai-fiesta-registration.firebaseapp.com",
  projectId: "ai-fiesta-registration",
  storageBucket: "ai-fiesta-registration.firebasestorage.app",
  messagingSenderId: "1056801211149",
  appId: "1:1056801211149:web:701b2393c80e13bd976644"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
