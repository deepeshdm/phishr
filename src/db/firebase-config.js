
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDAViJq9I62DBjrtsVmdpj82YBbqnMR_QE",
  authDomain: "phishr-d74a9.firebaseapp.com",
  projectId: "phishr-d74a9",
  storageBucket: "phishr-d74a9.appspot.com",
  messagingSenderId: "562656864810",
  appId: "1:562656864810:web:11fe4ab7e9be5fa979f153"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore
export const db = getFirestore(firebaseApp);
export { auth, googleAuthProvider };