import { db } from "@/firebase/initFirebase";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const getCollection = async (col) => {
  const colRef = collection(db, col);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addToCollection = async (col, data) => {
  const colRef = collection(db, col);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
};

export const getDocument = async (col, id) => {
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateDocument = async (col, id, data) => {
  const docRef = doc(db, col, id);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (col, id) => {
  const docRef = doc(db, col, id);
  await deleteDoc(docRef);
};
