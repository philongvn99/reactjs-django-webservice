// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH5W3FozdZuWmNZgl-VZSBXeFl58h-83Y",
  authDomain: "plfirebase-cc1f1.firebaseapp.com",
  databaseURL: "https://plfirebase-cc1f1.firebaseio.com",
  projectId: "plfirebase-cc1f1",
  storageBucket: "plfirebase-cc1f1.appspot.com",
  messagingSenderId: "986239440330",
  appId: "1:986239440330:web:b201f75f8dda3e7e22eb33",
  measurementId: "G-XYR3QMCEZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);