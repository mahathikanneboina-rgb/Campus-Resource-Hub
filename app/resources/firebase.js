import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYWcUdyGb1ILQcgXMAIXciOC8ypkwbK4M",
  authDomain: "campus-resource-hub-5734b.firebaseapp.com",
  projectId: "campus-resource-hub-5734b",
  storageBucket: "campus-resource-hub-5734b.firebasestorage.app",
  messagingSenderId: "20535641587",
  appId: "1:20535641587:web:17596882a119f192607e86",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);