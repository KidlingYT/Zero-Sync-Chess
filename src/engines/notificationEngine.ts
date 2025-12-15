// Notification Engine encapsulates notification volatility.

import { usePlayerManagerStore } from "@/managers/PlayerManager";

export const NotificationEngine = () => {
    const { playerManager } = usePlayerManagerStore();

    if (!playerManager) return;

    let notification;

    switch (playerManager?.getView()) {
        case "Mobile":
        case "Desktop":
        case "Tablet":
    }
};

export class Notification {
    message = "";

    constructor() {}
}
