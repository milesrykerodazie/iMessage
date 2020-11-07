import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAVX_7KATttqZPQWeD6UTD3FORQsIYPI24",
  authDomain: "imessage-clone-3de79.firebaseapp.com",
  databaseURL: "https://imessage-clone-3de79.firebaseio.com",
  projectId: "imessage-clone-3de79",
  storageBucket: "imessage-clone-3de79.appspot.com",
  messagingSenderId: "977028171636",
  appId: "1:977028171636:web:f30810650b07fc38b30e21",
  measurementId: "G-S6TK2VJZLQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
