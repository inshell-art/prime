import app from "./app";
import dotenv from "dotenv";
import { onRequest } from "firebase-functions/v2/https";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

let server: any; // Variable to store the server instance

// For local development
if (process.env.NODE_ENV === "dev") {
  const port = process.env.PORT || 3333;
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// For emulators, staging, and production
export const api = onRequest(app);
