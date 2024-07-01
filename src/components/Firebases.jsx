import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDAdI2Gbno7_McJjmfU4m2UWGFlCLnOGHU",
  authDomain: "reactproject-977ac.firebaseapp.com",
  projectId: "reactproject-977ac",
  storageBucket: "reactproject-977ac.appspot.com",
  messagingSenderId: "79060418023",
  appId: "1:79060418023:web:99ca23b1636bfd5ff99142",
  measurementId: "G-CQV11XS7F5"
};
firebase.initializeApp(firebaseConfig);
export const dataRef=firebase.database();

export default firebase;
