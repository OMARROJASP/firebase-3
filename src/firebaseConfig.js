import { initializeApp } from "firebase/app";

import {getAuth,onAuthStateChanged } from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyACPGtf9VZLr7XoOfCip_s3PzRkRgVy2Pc",
    authDomain: "vue-3-2022-2.firebaseapp.com",
    projectId: "vue-3-2022-2",
    storageBucket: "vue-3-2022-2.appspot.com",
    messagingSenderId: "184108342988",
    appId: "1:184108342988:web:7e51c4d40b8147ec866c69"
};


initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore()
export { auth, db}