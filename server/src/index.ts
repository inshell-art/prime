import app from './app';
import { onRequest } from 'firebase-functions/v2/https';

const env = process.env.NODE_ENV;

// For local dev
if (env === 'dev') {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}

// For emu, staging, and prod
export const getPrime = onRequest(app);
