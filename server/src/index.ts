import functions from "firebase-functions";
import admin from "firebase-admin";
import app from "./app";
import { port } from "./config";

admin.initializeApp();

// For development environment only
if (!process.env.FUNCTIONS_EMULATOR) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export const api = functions.https.onRequest(app);
