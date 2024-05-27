import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

console.log("Hello from Vite main.tsx!");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
