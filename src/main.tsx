import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { isDesktop } from "react-device-detect";
import {
    PlayerManager,
    PlayerView,
    usePlayerManagerStore,
} from "./managers/PlayerManager";
import { ChessEngine } from "./engines/chessEngine";
import { SecurityUtility, useSecurityUtilityStore } from "./utilities/Security";

// Todo: implement Tablet
const playerView: PlayerView = isDesktop ? "Desktop" : "Mobile";

const playerManager = new PlayerManager({ playerView: playerView });
const securityUtility = new SecurityUtility();

usePlayerManagerStore.setState({ playerManager });
useSecurityUtilityStore.setState({ securityUtility });

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChessEngine />
    </StrictMode>
);
