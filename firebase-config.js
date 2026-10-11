import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AiZaSyC4TxxVRos1JA5dfLrTkANgrKeoucK7Heo",
  authDomain: "palyx-ff-tournament-1.firebaseapp.com",
  databaseURL: "https://palyx-ff-tournament-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "প্যালিক্স-এফএফ-টুর্নামেন্ট-১",
  storageBucket: "palyx-ff-tournament-1.firebasestorage.app",
  messagingSenderId: "653240531571",
  appId: "1:653240531571:web:327ffbf5f0dae3246e4806",
  measurementId: "G-HN4HZYK4X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
