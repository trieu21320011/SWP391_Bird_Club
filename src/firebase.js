// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyOgkXiawghl_3jHZ7UAqGfa3fprX4HTY",
  authDomain: "birdclub-dbd3d.firebaseapp.com",
  databaseURL: "https://birdclub-dbd3d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "birdclub-dbd3d",
  storageBucket: "birdclub-dbd3d.appspot.com",
  messagingSenderId: "329705695848",
  appId: "1:329705695848:web:ed04c4777de2c9cb6e29dd",
  measurementId: "G-EP0VCDTTRT"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;
