import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB75-Iz2mPYB_42tYCLTs39w78wzHZmVK8",
  authDomain: "giuaky-f12ed.firebaseapp.com",
  projectId: "giuaky-f12ed",
  storageBucket: "giuaky-f12ed.appspot.com",
  messagingSenderId: "988173433769",
  appId: "1:988173433769:web:32762bd202f71944a822b8",
  measurementId: "G-8HH4290YP9"

  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };