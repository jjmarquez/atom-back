import * as assert from "assert";
import * as dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  CLIENT_EMAIL,
  PRIVATE_KEY,
} = process.env;

assert.ok(PORT, "Port is required");
assert.ok(HOST, "Host is required");

assert.ok(CLIENT_EMAIL, "Client Email is required");
assert.ok(PRIVATE_KEY, "Private Key is required");

export default {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    clientEmail: CLIENT_EMAIL,
    privateKey: PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
};
