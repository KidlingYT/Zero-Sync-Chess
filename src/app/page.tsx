"use client";
import { StrictMode } from "react";
import { isDesktop } from "react-device-detect";
import {
    PlayerManager,
    PlayerView,
    usePlayerManagerStore,
} from "../managers/PlayerManager";
import { ChessEngine } from "../engines/chessEngine";
import {
    SecurityUtility,
    useSecurityUtilityStore,
} from "../utilities/security";

// Todo: implement Tablet
const playerView: PlayerView = isDesktop ? "Desktop" : "Mobile";

const playerManager = new PlayerManager({ playerView: playerView });
const securityUtility = new SecurityUtility();

usePlayerManagerStore.setState({ playerManager });
useSecurityUtilityStore.setState({ securityUtility });

export default function Page() {
    return (
        <StrictMode>
            <ChessEngine />
        </StrictMode>
    );
}
