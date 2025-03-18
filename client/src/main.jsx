import App from "@/App.jsx";
import "@/fontawesome/css/all.min.css";
import "@/styles/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
