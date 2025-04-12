import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { schema } from "../schema.ts";

const z = new Zero({
  userID: "anon",
  server: "https://localhost:4848",
  schema,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZeroProvider zero={z}>
      <App />
    </ZeroProvider>
  </StrictMode>
);
