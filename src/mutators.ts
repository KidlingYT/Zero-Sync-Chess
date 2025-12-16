import { defineMutator, defineMutators } from "@rocicorp/zero";
import { z } from "zod";

const chessGameSchema = z.object({
    id: z.string(),
    white_player_name: z.string(),
    black_player_name: z.string(),
    fen: z.string(),
    is_active: z.boolean(),
    white_time: z.number(),
    black_time: z.number(),
});

const usersSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
});

export const mutators = defineMutators({
    chess_games: {
        create: defineMutator(chessGameSchema, async ({ tx, args }) => {
            await tx.mutate.chess_games.insert(args);
        }),
        update: defineMutator(
            { ...z.object({ id: z.string() }), ...chessGameSchema.partial() },
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
        users: {
            create: defineMutator(usersSchema, async ({ tx, args }) => {
                await tx.mutate.users.insert(args);
            }),
            update: defineMutator(
                { ...z.object({ id: z.string() }), ...usersSchema.partial() },
                async ({ tx, args }) => {
                    await tx.mutate.users.update(args);
                }
            ),
            delete: defineMutator(
                z.object({ id: z.string() }),
                async ({ tx, args }) => {
                    await tx.mutate.users.delete(args);
                }
            ),
        },
    },
});
