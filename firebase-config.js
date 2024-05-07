// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVhfNeQTaqQfWADqOm0q9wro6mYw-P9Kk",
  authDomain: "prime-00000.firebaseapp.com",
  projectId: "prime-00000",
  storageBucket: "prime-00000.appspot.com",
  messagingSenderId: "674886833473",
  appId: "1:674886833473:web:ece87fc9bb080f93a43dc0",
  measurementId: "G-N4Z03QLMVH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
