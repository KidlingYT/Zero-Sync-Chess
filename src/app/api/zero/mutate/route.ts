import { handleMutateRequest } from "@rocicorp/zero/server";
import { mustGetMutator } from "@rocicorp/zero";
import { mutators } from "mutators.ts";
import { dbProvider } from "./db-provider.ts";

export async function POST(req: Request) {
    const result = await handleMutateRequest(
        dbProvider,
        (transact) =>
            transact((tx, name, args) => {
                const mutator = mustGetMutator(mutators, name);
                return mutator.fn({ args, tx, ctx: { userID: "anon" } });
            }),
        req
    );

    return Response.json(result);
}
