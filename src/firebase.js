import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBD2n-DoGeQF7CFLnuT6_f-j7JKG_VoG-w",
  authDomain: "instagram-clone-8c88e.firebaseapp.com",
  databaseURL: "https://instagram-clone-8c88e.firebaseio.com",
  projectId: "instagram-clone-8c88e",
  storageBucket: "instagram-clone-8c88e.appspot.com",
  messagingSenderId: "119579087380",
  appId: "1:119579087380:web:c6549da94f76e8c8484d01",
  measurementId: "G-WD3N0CMPRE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
