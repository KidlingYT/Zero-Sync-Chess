import { defineMutator } from "@rocicorp/zero";
import z from "zod";

const usersCreateSchema = z.object({
    name: z.string("Name is required when creating a user."),
    email: z.email("Email is required when creating a user."),
    password: z.string("Password is required when creating a user."),
});

const usersUpdateSchema = usersCreateSchema.partial().extend({
    email: z.email("Email is required when updating"),
});

const usersDeleteSchema = z.object({
    email: z.email("Email is required when deleting"),
});

export const users_mutators = {
    create: defineMutator(usersCreateSchema, async ({ tx, args }) => {
        await tx.mutate.chess_games.insert(args);
    }),
    update: defineMutator(usersUpdateSchema, async ({ tx, args }) => {
        await tx.mutate.chess_games.update(args);
    }),
    delete: defineMutator(usersDeleteSchema, async ({ tx, args }) => {
        await tx.mutate.chess_games.delete(args);
    }),
};
