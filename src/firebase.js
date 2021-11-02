import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBigEoIAA8pJwW1DK0-oBXDYGX8TyZtH2E",
  authDomain: "mail-mate.firebaseapp.com",
  projectId: "mail-mate",
  storageBucket: "mail-mate.appspot.com",
  messagingSenderId: "992200101366",
  appId: "1:992200101366:web:4814fecb81b922e07c4bd7",
  measurementId: "G-EG6QLZEQWX",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };
