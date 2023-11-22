// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb6X2B4Ufbku2yebiZvKCDpF0bpeqzEXo",
  authDomain: "crudv3-96a9a.firebaseapp.com",
  databaseURL: "https://crudv3-96a9a-default-rtdb.firebaseio.com",
  projectId: "crudv3-96a9a",
  storageBucket: "crudv3-96a9a.appspot.com",
  messagingSenderId: "438224016969",
  appId: "1:438224016969:web:1bbe7be46b6dfc75b49198",
  measurementId: "G-5H9GLN1Y23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);