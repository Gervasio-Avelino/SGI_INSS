/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { auth, db } from '../firebaseConfig';
import React, { useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setCurrentUser(userDoc.data());
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      setCurrentUser(userDoc.data());
      return userDoc.data();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  const register = async (name, email, password, role, department, phone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        uid,
        name,
        email,
        role,
        department,
        phone,
        isAdmin: role === 'Administrador',
      });

      const userDoc = await getDoc(doc(db, 'users', uid));
      setCurrentUser(userDoc.data());
      return userDoc.data();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
