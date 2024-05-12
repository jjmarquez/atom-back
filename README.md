# atom-challenge

This project is structured as a Firebase Cloud Functions project written in TypeScript. Here's a brief overview of the main components:

- `lib/functions/src/index.js`: This is the entry point of the application. The TypeScript source code is transpiled to JavaScript and output to this file.

- `firebase-admin` and `firebase-functions`: These are Firebase libraries for interacting with Firebase services in Cloud Functions.

- `joi`: This is a library for data validation.

- `dotenv`: This is a module that loads environment variables from a `.env` file into `process.env`.

## .env

This project requires a `.env` file for local development. Please create a `.env` file in the root directory of the project and in ./functions root add the following environment variables:

```env
PORT=5000 <--- Delete this one for the /functions .env
HOST=localhost
HOST_URL=http://localhost:5000

# Firebase config
API_KEY="your-api-key"
AUTH_DOMAIN="your-auth-domain"
PROJECT_ID="your-project-id"
STORAGE_BUCKET="your-storage-bucket"
MESSAGING_SENDER_ID="your-messaging-sender-id"
APP_ID="your-app-id"
CLIENT_EMAIL="your-client-email"
PRIVATE_KEY="your-private-key"
```
