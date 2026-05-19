import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Hydrate theme class before first paint to avoid a flash
(() => {
  try {
    const t = localStorage.getItem("r3s-theme") || "light";
    document.documentElement.classList.add(t);
  } catch {
    document.documentElement.classList.add("light");
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
