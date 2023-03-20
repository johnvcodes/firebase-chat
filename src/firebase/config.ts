import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDh1DBulADMObAbxyVVmzJazE1YPqxQXFs",
  authDomain: "portfolio-585dc.firebaseapp.com",
  projectId: "portfolio-585dc",
  storageBucket: "portfolio-585dc.appspot.com",
  messagingSenderId: "516711281409",
  appId: "1:516711281409:web:3ba756352ba06e479d2100",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
