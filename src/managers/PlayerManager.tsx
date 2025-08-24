// Player Manager encapsulates player volatility.

// Client application volatility
import { create } from "zustand";

const DEFAULT_PLAYER_VIEW: PlayerView = "Desktop";
const DEFAULT_RESOURCE_PROVIDER: ResourceProvider = "Zero";

export type PlayerView = "Mobile" | "Desktop" | "Tablet";
export type ResourceProvider = "Zero"; // TODO: provide multiple resource providers

interface PlayerManagerProps {
    playerView: PlayerView;
    resourceProvider?: ResourceProvider;
}

export class PlayerManager {
    private playerView: PlayerView = DEFAULT_PLAYER_VIEW;
    private resourceProvider: ResourceProvider = DEFAULT_RESOURCE_PROVIDER;

    constructor(props: PlayerManagerProps) {
        this.playerView = props.playerView;
        this.resourceProvider =
            props?.resourceProvider ?? DEFAULT_RESOURCE_PROVIDER;
    }

    getView(): PlayerView {
        return this.playerView;
    }

    getResourceProvider(): ResourceProvider {
        return this.resourceProvider;
    }
}

interface PlayerManagerStore {
    playerManager: PlayerManager | undefined;
    setPlayerManager: (pm: PlayerManager | undefined) => void;
}

export const usePlayerManagerStore = create<PlayerManagerStore>((set) => ({
    playerManager: undefined,
    setPlayerManager: (pm) => set({ playerManager: pm }),
}));
