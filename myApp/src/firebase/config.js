import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBSSN5S37Oa0HTqh-ZO-PgddW6-9Hudt14",
    authDomain: "finalprog3-b8ffa.firebaseapp.com",
    projectId: "finalprog3-b8ffa",
    storageBucket: "finalprog3-b8ffa.appspot.com",
    messagingSenderId: "110604617011",
    appId: "1:110604617011:web:79753549df2a45d32daa46"
  };
  
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();