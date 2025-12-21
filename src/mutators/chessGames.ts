import { BLANKFEN } from "@/utilities/lib/chessGame";
import { defineMutator } from "@rocicorp/zero";
import z from "zod";

const chessGamesCreateSchema = z.object({
    id: z.string("Id is required when adding an id"),
    white_player_name: z.string().default("Anon"),
    black_player_name: z.string().default("Anon"),
    fen: z.string().default(BLANKFEN),
    is_active: z.boolean().default(true),
    white_time: z.number().default(600), // in tenths of a second
    black_time: z.number().default(600), // in tenths of a second
});

const chessGamesUpdateSchema = chessGamesCreateSchema.partial().extend({
    id: z.string("Id is required when updating"),
});

const chessGamesDeleteSchema = z.object({
    id: z.string("Id is required when deleting"),
});

export const chess_games_mutators = {
    create: defineMutator(chessGamesCreateSchema, async ({ tx, args }) => {
        await tx.mutate.chess_games.insert(args);
    }),
    update: defineMutator(chessGamesUpdateSchema, async ({ tx, args }) => {
        await tx.mutate.chess_games.update(args);
    }),
    delete: defineMutator(chessGamesDeleteSchema, async ({ tx, args }) => {
        await tx.mutate.chess_games.delete(args);
    }),
};
