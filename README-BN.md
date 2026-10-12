# PlayX FF Tournament — Full Starter (Firebase)

## ফাইলগুলো
- `index.html` — responsive website UI
- `style.css` — design
- `firebase-config.js` — তোমার Firebase web config
- `app.js` — Firebase Authentication, tournament join, room details, results ও admin UI
- `firestore.rules` — প্রস্তাবিত Firestore Security Rules

## 1) Firebase তৈরি
1. https://console.firebase.google.com/ খুলে project তৈরি করো।
2. Project Overview → Add app → Web (``) → app nickname `PlayX FF Tournament`।
3. Firebase config কপি করে `firebase-config.js`-এ placeholder-গুলোর জায়গায় বসাও।
4. Authentication → Sign-in method → Email/Password enable করো।
5. Firestore Database → Create database (production mode)।
6. Firestore Rules ট্যাবে `firestore.rules`-এর rules বসিয়ে Publish করো।

## 2) Admin access নিরাপদভাবে চালু করা
Admin panel শুধু তখনই দেখা যাবে যখন Firebase ID token-এ `admin: true` custom claim থাকবে। সাধারণ user নিজের claim নিজে তৈরি করতে পারে না। Custom claim trusted Admin SDK দিয়ে সেট করতে হয়। Service-account private key কখনো browser, GitHub repository বা public hosting-এ আপলোড করবে না।

প্রাথমিক admin তৈরি করতে:
- Google Cloud/Firebase trusted environment-এ Firebase Admin SDK ব্যবহার করে নির্দিষ্ট UID-তে `admin: true` custom claim সেট করো।
- এটি locally trusted computer-এ private service-account file নিরাপদে রেখে করা যায়; কিন্তু সেই file GitHub-এ commit করা যাবে না।
- claim সেট করার পর admin account থেকে logout/login করো বা token refresh করো।
- UID দেখতে Firebase Console → Authentication → Users।
- যদি Admin SDK/terminal ব্যবহার করা সম্ভব না হয়, প্রথমে একজন বিশ্বস্ত developer-এর সাহায্যে claim সেট করাও। শুধু email check বা frontend variable দিয়ে admin security তৈরি করো না।

Node.js trusted environment-এর উদাহরণ (service account key নিরাপদে ডাউনলোড ও রাখার পর; `admin-setup.cjs`-এ রাখবে, public website folder-এ নয়):
```js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
admin.auth().setCustomUserClaims("FIREBASE_AUTH_USER_UID", { admin: true })
  .then(() => { console.log("Admin claim set"); process.exit(0); })
  .catch(err => { console.error(err); process.exit(1); });
```
এটি শুধু trusted local setup script। `serviceAccountKey.json` ও `admin-setup.cjs` public repository-তে রাখবে না; `.gitignore`-এ যোগ করো।

## 3) GitHub Pages-এ ফ্রি publish
1. GitHub-এ `playx-ff-tournament` নামে repository তৈরি করো।
2. `index.html`, `style.css`, `app.js`, `firebase-config.js` আপলোড করো। `firestore.rules` এবং README-ও রাখতে পারো।
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save।
4. GitHub Pages URL খুলে পরীক্ষা করো। Firebase Authentication → Settings → Authorized domains-এ তোমার GitHub Pages host (যেমন `username.github.io`) যোগ আছে কি না দেখো।
5. Firebase Console-এ API key restrictions দরকার হলে সঠিকভাবে configure করো; API key public config হলেও unrestricted key-কে secret মনে করো না।

## 4) Firestore data
- `users/{uid}` — profile
- `tournaments/{tournamentId}` — event details
- `registrations/{uid_tournamentId}` — player registration
- `roomDetails/{tournamentId}` — room id/password; registered players and admins can read
- `results/{resultId}` — published result

## 5) আগে থেকে টুর্নামেন্ট যোগ করা
Admin claim সেট করার পর website-এ admin account দিয়ে login করো। Admin Panel থেকে tournament তৈরি, room info সংরক্ষণ, result publish করা যাবে। Player registration table-এ player UID ও tournament ID দেখা যাবে।

## নিরাপত্তা নোট
- Firestore Rules public web app-এর নিরাপত্তার গুরুত্বপূর্ণ অংশ; deploy করার আগে Rules Playground/Emulator দিয়ে পরীক্ষা করো।
- Room ID/password বাস্তব ম্যাচের সময়ের কাছাকাছি প্রকাশ করো; এগুলো নিবন্ধিত খেলোয়াড়দের কাছে visible হবে।
- এই starter এখন basic tournament registration; full squad member registration, cancellation, bracket automation, payment, notifications অন্তর্ভুক্ত নয়।
- Entry fee/prize চালুর আগে স্থানীয় আইন, গেমের শর্ত এবং পেমেন্ট সংক্রান্ত বাধ্যবাধকতা যাচাই করো।
- এটি fan-made platform; Garena/Free Fire-এর official service নয়।
