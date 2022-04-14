import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAuth } from "firebase/auth";
// import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2BNu_cBZ5Ko7RZ40MO_fkaKQhTPxSak4",
  authDomain: "chat-app-42434.firebaseapp.com",
  projectId: "chat-app-42434",
  storageBucket: "chat-app-42434.appspot.com",
  messagingSenderId: "933270401828",
  appId: "1:933270401828:web:a959a161099e8e26b539b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// connectAuthEmulator(auth, "http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }
