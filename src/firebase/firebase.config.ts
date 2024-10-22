// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getStorage } from "firebase/storage"; // Importa Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuJYU_DOgXIo-gzFh5jPHE1CczGLvcWgY",
  authDomain: "rodrigogremco.firebaseapp.com",
  projectId: "rodrigogremco",
  storageBucket: "rodrigogremco.appspot.com",
  messagingSenderId: "848410078786",
  appId: "1:848410078786:web:899b765ddd87cb9d2e07db",
  measurementId: "G-ELJ1CFFW15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Inicializa Firestore

// Initialize Storage
const storage = getStorage(app); // Inicializa Storage

// Export Firestore and Storage for use in other files
export { db, storage };
