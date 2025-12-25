import { chess_games_mutators } from "@/mutators/chessGames";
import { users_mutators } from "@/mutators/users";
import { defineMutators } from "@rocicorp/zero";

export const mutators = defineMutators({
    chess_games: chess_games_mutators,
    users: users_mutators,
});
