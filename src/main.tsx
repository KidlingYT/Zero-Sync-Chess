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

// Todo: implement Tablet
const playerView: PlayerView = isDesktop ? "Desktop" : "Mobile";

const playerManager = new PlayerManager({ playerView: playerView });

usePlayerManagerStore.setState({ playerManager });

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChessEngine />
    </StrictMode>
);
