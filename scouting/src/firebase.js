import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyDtwoNjpGW5C6mzjuPonGErbeYQb-mN0ug",
    authDomain: "team8521-scouting-webapp.firebaseapp.com",
    projectId: "team8521-scouting-webapp",
    storageBucket: "team8521-scouting-webapp.appspot.com",
    messagingSenderId: "361281385950",
    appId: "1:361281385950:web:e5c57086e7f598df9f994f",
    measurementId: "G-KMK00R19SX"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const functions = getFunctions(app);

  