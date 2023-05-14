import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCDjn9Gy83NKvoICaK6kMx5e6i8JH1RNlo",
    authDomain: "netflix-app-9a265.firebaseapp.com",
    projectId: "netflix-app-9a265",
    storageBucket: "netflix-app-9a265.appspot.com",
    messagingSenderId: "124569400622",
    appId: "1:124569400622:web:cfc22cb902fefcdb0ff6bf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)