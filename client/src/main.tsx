import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const env = process.env.NODE_ENV;

if (env === 'prod') {
  const firebaseConfig = {
    apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
    projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
    appId: process.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
