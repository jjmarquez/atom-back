import * as admin from "firebase-admin";
import config from "./config";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.firebaseConfig.projectId,
    clientEmail: config.firebaseConfig.clientEmail,
    privateKey: config.firebaseConfig.privateKey,
  }),
  databaseURL: `https://${config.firebaseConfig.projectId}.firebaseio.com`,
});

const db = admin.firestore();

export default db;
export { admin };
