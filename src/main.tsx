import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { isDesktop } from "react-device-detect";
import { PlayerManager, PlayerView } from "./managers/PlayerManager";

// Todo: implement Tablet
const playerView: PlayerView = isDesktop ? "Desktop" : "Mobile";

const playerManager = new PlayerManager({ PlayerView: playerView });
const App = playerManager.RenderApp();
const AppWithResource = playerManager.ResourceAccessLayer({ children: App });

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppWithResource />
    </StrictMode>
);
