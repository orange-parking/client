import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCm9f6R563RP0gexYqBNxGY4sjKzHslJW8",
    authDomain: "parkirhusni.firebaseapp.com",
    databaseURL: "https://parkirhusni.firebaseio.com",
    projectId: "parkirhusni",
    storageBucket: "parkirhusni.appspot.com",
    messagingSenderId: "881669296476",
    appId: "1:881669296476:web:09fa5bc6120fa97a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db