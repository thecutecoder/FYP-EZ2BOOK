// Import the functions you need from the SDKs you need

import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA619NMPHSFGu0JJCTtBMuTlYuwCzzyHRU",
  authDomain: "ez2bookdb.firebaseapp.com",
  projectId: "ez2bookdb",
  storageBucket: "ez2bookdb.appspot.com",
  messagingSenderId: "6111576554",
  appId: "1:6111576554:web:c6c1075e4aebbc613ef293"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.firestore().settings({ experimentalForceLongPolling: true})
let app;
 if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
} else {
  app =firebase.app();
}
const auth =firebase.auth();
const database = app.firestore();
const storage = firebase.storage();



export {auth, database, storage}


