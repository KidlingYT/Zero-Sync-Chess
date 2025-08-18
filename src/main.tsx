import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./clients/web/App.tsx";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { schema } from "../schema.ts";
import { decodeJwt } from "jose";
import Cookie from "js-cookie";

const encodedJwtToken = Cookie.get("jwt");
const decodedJwtToken = encodedJwtToken && decodeJwt(encodedJwtToken);
const userID = decodedJwtToken?.sub ? (decodedJwtToken.sub as string) : "anon";

const z = new Zero({
    userID,
    auth: () => encodedJwtToken,
    server: "http://localhost:4848",
    schema,
    kvStore: "idb",
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ZeroProvider zero={z}>
            <App />
        </ZeroProvider>
    </StrictMode>
);
