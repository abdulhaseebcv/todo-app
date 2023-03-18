import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBtfYUZvl-YBUjT-SVAmwPrw_cUoN8nYKw",
  authDomain: "todo-app-f5963.firebaseapp.com",
  projectId: "todo-app-f5963",
  storageBucket: "todo-app-f5963.appspot.com",
  messagingSenderId: "609916338718",
  appId: "1:609916338718:web:767962cf0cb249aa69640f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
