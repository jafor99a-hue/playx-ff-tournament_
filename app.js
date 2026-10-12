// ফায়ারবেস ইনিশিয়ালাইজ করা
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// সাইন-আপ এবং টুর্নামেন্টে ডেটা সেভ করার ফাংশন
function registerAndJoinTournament() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gameName = document.getElementById('gameName').value;
    const gameUid = document.getElementById('gameUid').value;

    // ১. ফায়ারবেস অথ-এ ইউজার তৈরি করা
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // ২. ফায়ারস্টোর ডেটাবেসে ইউজারের ফ্রি ফায়ার তথ্য সেভ করা
            return db.collection("tournaments").doc("match_01").collection("players").doc(user.uid).set({
                uid: user.uid,
                email: email,
                inGameName: gameName,
                freeFireUid: gameUid,
                joinedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("সফলভাবে টুর্নামেন্টে রেজিস্ট্রেশন সম্পন্ন হয়েছে!");
        })
        .catch((error) => {
            console.error("ত্রুটি ঘটেছে: ", error.message);
            alert("ত্রুটি: " + error.message);
        });
}