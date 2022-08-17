const firebaseAdminSdk = require("firebase-admin");
const devServiceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

try {
    firebaseAdminSdk.initializeApp({
        credential: firebaseAdminSdk.credential.cert(devServiceAccount),
    });
} catch (e) {
    console.log(e.message);
}

module.exports = ({}) => ({
    verifyToken: (token) => firebaseAdminSdk.auth().verifyIdToken(token),
});
