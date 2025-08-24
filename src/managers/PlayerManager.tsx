// Player Manager encapsulates player volatility.

// Client application volatility
import DesktopApp from "@/clients/web/App";
import { ZeroResource } from "@/resources/zeroSyncResource";

const DEFAULTPLAYERVIEW: PlayerView = "Desktop";

export type PlayerView = "Mobile" | "Desktop" | "Tablet";

interface PlayerManagerProps {
    PlayerView: PlayerView;
}

export class PlayerManager {
    // default to desktop
    private PlayerView: PlayerView = DEFAULTPLAYERVIEW;

    constructor(props: PlayerManagerProps) {
        this.PlayerView = props.PlayerView;
    }

    ResourceAccessLayer({ children }: { children: React.ReactNode }) {
        // default to using zero sync
        return () => <ZeroResource>{children}</ZeroResource>;
    }

    RenderApp(): React.ReactNode {
        switch (this.PlayerView) {
            case "Mobile":
                console.warn(
                    "Mobile App not implemented yet. Defaulting to Dektop."
                );
                return <DesktopApp />;
            case "Desktop":
                return <DesktopApp />;
            case "Tablet":
                console.warn(
                    "Mobile App not implemented yet. Defaulting to Dektop."
                );
                return <DesktopApp />;
        }
    }
}
