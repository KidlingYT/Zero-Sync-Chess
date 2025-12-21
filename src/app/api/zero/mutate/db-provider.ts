import { zeroPostgresJS } from "@rocicorp/zero/server/adapters/postgresjs";
import postgres from "postgres";
import { schema } from "schema.ts";

const sql = postgres(process.env.ZERO_UPSTREAM_DB!);
export const dbProvider = zeroPostgresJS(schema, sql);

// Register the database provider for type safety
declare module "@rocicorp/zero" {
    interface DefaultTypes {
        dbProvider: typeof dbProvider;
    }
}
