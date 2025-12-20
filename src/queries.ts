import { defineQueries, defineQuery } from "@rocicorp/zero";
import { zql } from "../schema";
import { z } from "zod";

export const queries = defineQueries({
    chess_games: {
        all: defineQuery(() => zql.chess_games.orderBy("id", "desc")),
        one: defineQuery(z.object({ id: z.string() }), ({ args: { id } }) =>
            zql.chess_games.where("id", id).one()
        ),
    },
});
