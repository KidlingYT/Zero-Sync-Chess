// Chess Engine encapsulates chess game volatility.
// And all execution logic...

import DesktopApp from "@/clients/web/App";
import { usePlayerManagerStore } from "@/managers/PlayerManager";
import { ZeroResource } from "@/resources/zeroSyncResource";

export const ChessEngine = () => {
    const { playerManager } = usePlayerManagerStore();

    if (!playerManager) return null;

    let app: React.ReactNode;

    switch (playerManager.getView()) {
        case "Desktop":
            app = <DesktopApp />;
            break;
        case "Mobile":
            app = <DesktopApp />;
            break;
        default:
            app = <DesktopApp />;
    }

    switch (playerManager.getResourceProvider()) {
        case "Zero":
            return <ZeroResource>{app}</ZeroResource>;
    }
};
