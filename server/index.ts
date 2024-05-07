import functions from "firebase-functions";
import admin from "firebase-admin";
import app from "./app";

admin.initializeApp(); //

export const api = functions.https.onRequest(app);
