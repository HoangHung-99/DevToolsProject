import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const fbConfig = firebase.initializeApp({
  apiKey: "AIzaSyD41aPOvFj2zdg9Ex5Jv9D9Uiz-WLZ8ISk",
  authDomain: "bookstore-react-3b115.firebaseapp.com",
  databaseURL: "https://bookstore-react-3b115-default-rtdb.firebaseio.com",
  projectId: "bookstore-react-3b115",
  storageBucket: "bookstore-react-3b115.appspot.com",
  messagingSenderId: "649766489157",
});


export default fbConfig;