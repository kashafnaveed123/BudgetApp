import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDTkB45RCQ5KeuS53FMcoOiyzoco_L-OfI",
  authDomain: "nskaryana-f7955.firebaseapp.com",
  projectId: "nskaryana-f7955",
  storageBucket: "nskaryana-f7955.firebasestorage.app",
  messagingSenderId: "489429458797",
  appId: "1:489429458797:web:6141007a947cdf5dd30464",
  measurementId: "G-SN9MH159XK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, db, storage };
