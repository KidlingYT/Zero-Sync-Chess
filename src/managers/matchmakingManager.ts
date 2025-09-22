//  Matchmaking Manager encapsulates matchmaking volatility.

import { chess_games, users } from "schema";

interface MatchmakingManagerProps {
    userInfo: users | undefined;
}
export class MatchmakingManager {
    private currentGame: chess_games | undefined = undefined;
    private userInfo: users | undefined = undefined;

    constructor(props: MatchmakingManagerProps) {
        this.userInfo = props.userInfo;
    }
}
