import functions from "firebase-functions";
import app from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} else {
  exports.api = functions.https.onRequest(app); // For emulators, staging and production
}
