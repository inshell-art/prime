import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const env = process.env.NODE_ENV;

if (env === 'prod') {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  console.log('Firebase app initialized');
  console.log('apiKey', firebaseConfig.apiKey);
  console.log('projectId', firebaseConfig.projectId);
  console.log('appId', firebaseConfig.appId);
  console.log('measurementId', firebaseConfig.measurementId);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
