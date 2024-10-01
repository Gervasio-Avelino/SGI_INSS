// src/services/activityService.js

import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export const logActivity = async (action, description) => {
  const activity = {
    action,
    description,
    date: new Date().toISOString(),
  };
  const activitiesCollection = collection(db, 'activities');

  console.log('Logging activity:', { action, description });

  await addDoc(activitiesCollection, activity);

  console.log('Activity logged');
};
