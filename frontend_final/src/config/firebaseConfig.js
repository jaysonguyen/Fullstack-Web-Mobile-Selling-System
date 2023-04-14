// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationc

const firebaseConfig = {
  apiKey: "AIzaSyC3oBT985_IYVq_23nkdR2ZWx-FL4Zgvws",
  authDomain: "web-mobile-system.firebaseapp.com",
  projectId: "web-mobile-system",
  storageBucket: "web-mobile-system.appspot.com",
  messagingSenderId: "191991962601",
  appId: "1:191991962601:web:3155d0b47063b241df8978",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
