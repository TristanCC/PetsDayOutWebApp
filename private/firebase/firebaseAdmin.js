// private/firebaseAdmin.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const serviceAccount = path.join('./private/',process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin Initialized");
}

export { admin };
