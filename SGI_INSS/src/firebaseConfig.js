// Configurações para a base de dados e autenticação com Firebase
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBV7y_jWad9JPKzVaKkpxiOrm0LGqrX3hU",
    authDomain: "sistema-de-inventario-e1c71.firebaseapp.com",
    projectId: "sistema-de-inventario-e1c71",
    storageBucket: "sistema-de-inventario-e1c71.appspot.com",
    messagingSenderId: "687540226826",
    appId: "1:687540226826:web:5bb7759375bd144da3c8f3",
    measurementId: "G-0S03FL2J7N"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
