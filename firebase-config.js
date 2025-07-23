// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKoc71K7YPwTj3026RbLSsvuQcD2z5AZE",
  authDomain: "my-website-785e8.firebaseapp.com",
  projectId: "my-website-785e8",
  storageBucket: "my-website-785e8.firebasestorage.app",
  messagingSenderId: "849918004938",
  appId: "1:849918004938:web:616ada4057bc6f34052e33",
  measurementId: "G-YDKJ52M2PV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
