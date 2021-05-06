const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("@models/relax-music-4ffdd-firebase-adminsdk-rxxys-a5105a2d41.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://relax-music-4ffdd-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = firebaseAdmin.database();
export default db;
