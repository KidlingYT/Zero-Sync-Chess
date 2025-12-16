import { defineMutator, defineMutators } from "@rocicorp/zero";
import z from "zod";

const chessGamesSchema = z.object({
    id: z.string(),
    white_player_name: z.string(),
    black_player_name: z.string(),
    fen: z.string(),
    is_active: z.boolean(),
    white_time: z.number(), // in seconds
    black_time: z.number(), // in seconds
});

export const mutators = defineMutators({
    chess_games: {
        create: defineMutator(chessGamesSchema, async ({ tx, args }) => {
            await tx.mutate.chess_games.insert(args);
        }),
        update: defineMutator(
            z.object({ id: z.string() }),
            async ({ tx, args }) => {
                await tx.mutate.chess_games.update(args);
            }
        ),
        delete: defineMutator(
            z.object({ id: z.string() }),
            async ({ tx, args }) => {
                await tx.mutate.chess_games.delete(args);
            }
        ),
    },
    users: {
        create: defineMutator(z.object({}), async ({ tx, args }) => {
            await tx.mutate.users.insert(args);
        }),
        update: defineMutator(z.object({}), async ({ tx, args }) => {
            await tx.mutate.users.update(args);
        }),
        delete: defineMutator(z.object({}), async ({ tx, args }) => {
            await tx.mutate.users.delete(args);
        }),
    },
});
