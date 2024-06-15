// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJMrYV0l1MchUemJUNlxgMOueAicmgpIA",
  authDomain: "busybuy-1-react.firebaseapp.com",
  projectId: "busybuy-1-react",
  storageBucket: "busybuy-1-react.appspot.com",
  messagingSenderId: "231267185672",
  appId: "1:231267185672:web:0a8e25e655ea91f11d0dbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app) //database
const auth = getAuth(app) //return user
export {auth};
export default db
