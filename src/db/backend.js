import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDIja0Ptp--XkoFl7Vily4ZuYpXZ0VkU0Y",
  authDomain: "whatsapp-clone-22f3d.firebaseapp.com",
  projectId: "whatsapp-clone-22f3d",
  storageBucket: "whatsapp-clone-22f3d.appspot.com",
  messagingSenderId: "670587830257",
  appId: "1:670587830257:web:215f9e8f8f468af6fe4e50",
  measurementId: "G-V69EQKTM0Z"
};

const firebaseApp  = firebase.initializeApp(firebaseConfig);
const database     = firebaseApp.firestore();
const authentifier = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {authentifier, provider};
export default database;