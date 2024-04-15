// The wrapper for the Express application by Firebase Functions
import functions from "firebase-functions";
import express from "express";

// Create an Express application
const app = express();

// Define a route handler
app.get("/", (_req, res) => {
  res.send("Hello, Firebase with Express and TypeScript!");
});

// Export the Express app as a Firebase function
export const api = functions.https.onRequest(app);
