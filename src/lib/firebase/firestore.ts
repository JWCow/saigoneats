import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  QueryConstraint,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

export const getCollection = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getDocument = async (collectionName: string, documentId: string) => {
  const docRef = doc(db, collectionName, documentId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return null;
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const queryCollection = async (collectionName: string, constraints: QueryConstraint[]) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addDocument = async (collectionName: string, data: DocumentData) => {
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, data);
  return docRef.id;
};

export const updateDocument = async (
  collectionName: string,
  documentId: string,
  data: Partial<DocumentData>
) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
};

export { db };
