// setAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = "care@learningbangladesh.com"; // এখানে যাকে admin বানাতে চাও, তার ইমেইল দাও

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`✅ ${email} is now an admin!`);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });
