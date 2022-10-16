// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA48ZsvxGMEDZrvP7R7XhDIe4Di1gVDSfA",
    authDomain: "ema-john-route-auth-context.firebaseapp.com",
    projectId: "ema-john-route-auth-context",
    storageBucket: "ema-john-route-auth-context.appspot.com",
    messagingSenderId: "842668133456",
    appId: "1:842668133456:web:279431ab716d950ce89555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;