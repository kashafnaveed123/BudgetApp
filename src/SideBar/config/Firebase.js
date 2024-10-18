import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAS0ETdm6qQQj-bjzQRPO2ESSxNiAaQioY",
  authDomain: "budgetsoftware-51a2d.firebaseapp.com",
  projectId: "budgetsoftware-51a2d",
  storageBucket: "budgetsoftware-51a2d.appspot.com",
  messagingSenderId: "430257477104",
  appId: "1:430257477104:web:08064bc3fe0bd42c7d3935",
  measurementId: "G-Q91E482REP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, db, storage };
