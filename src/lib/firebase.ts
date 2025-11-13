import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6LUrGwUH3owxmPHlTiuO-wokj4ZbwCwI",
    authDomain: "lexium-7e457.firebaseapp.com",
    projectId: "lexium-7e457",
    storageBucket: "lexium-7e457.firebasestorage.app",
    messagingSenderId: "827382701221",
    appId: "1:827382701221:web:2d0eb5c8a9c66a2320014c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
