<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC4TxxVRoslJA5dfLrTkANgrKeoucK7Heo",
    authDomain: "palyx-ff-tournament-1.firebaseapp.com",
    databaseURL: "https://palyx-ff-tournament-1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "palyx-ff-tournament-1",
    storageBucket: "palyx-ff-tournament-1.firebasestorage.app",
    messagingSenderId: "653240531571",
    appId: "1:653240531571:web:38cac37eb375ee216e4806",
    measurementId: "G-8R9NYJT5NK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
