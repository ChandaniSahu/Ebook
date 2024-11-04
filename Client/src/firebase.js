// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxy-gYfz4lfMbW2OgqUBgdybgAzTMrEYM",
  authDomain: "ebook-468e2.firebaseapp.com",
  projectId: "ebook-468e2",
  storageBucket: "ebook-468e2.appspot.com",
  messagingSenderId: "435022962985",
  appId: "1:435022962985:web:7129b82569fe71aa031738"
};

// Initialize Firebase
const app=firebase.initializeApp(firebaseConfig);
export default app