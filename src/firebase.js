// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDJORkn3a6TVL4d12qfYRTMuLe6-4OokYI",
    authDomain: "frolf-64b22.firebaseapp.com",
    projectId: "frolf-64b22",
    storageBucket: "frolf-64b22.appspot.com",
    messagingSenderId: "30517678072",
    appId: "1:30517678072:web:ba4e2ad58a399413ce100d",
    measurementId: "G-KCBMXXB59H"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }
