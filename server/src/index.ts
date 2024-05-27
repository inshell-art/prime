import functions from "firebase-functions";
import app from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log("Hello from index.ts!", process.env.NODE_ENV);

// For local development
if (process.env.NODE_ENV === "dev") {
  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
// For emulators, staging, and production
export const api = functions.https.onRequest(app);
