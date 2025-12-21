// app/api/zero/query/route.ts
import { handleQueryRequest } from "@rocicorp/zero/server";
import { mustGetQuery } from "@rocicorp/zero";
import { queries } from "queries.ts";
import { schema } from "schema.ts";

export async function POST(req: Request) {
    const result = await handleQueryRequest(
        (name, args) => {
            const query = mustGetQuery(queries, name);
            return query.fn({ args, ctx: { userId: "anon" } });
        },
        schema,
        req
    );

    return Response.json(result);
}
