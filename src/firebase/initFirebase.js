import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { app, db };
