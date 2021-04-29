import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1T5vnOy7jM87MtqI3OUn5YurkEDBJU1w",
  authDomain: "fintext-10bd4.firebaseapp.com",
  projectId: "fintext-10bd4",
  storageBucket: "fintext-10bd4.appspot.com",
  messagingSenderId: "332583960183",
  appId: "1:332583960183:web:351c9d9c22aef82d385072"
};

firebase.initializeApp(firebaseConfig);