import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyA68GsKhNvHvS8oEnCcbHhLL8gyDGHVsZQ",
    authDomain: "heychat-app.firebaseapp.com",
    projectId: "heychat-app",
    storageBucket: "heychat-app.appspot.com",
    messagingSenderId: "182912426864",
    appId: "1:182912426864:web:ebcbc59022dcdc569f25b5",
    measurementId: "G-P26YGGZW63",
  })
  .auth();
