// app/api/mutate/db-provider.ts
import { zeroNodePg } from "@rocicorp/zero/server/adapters/pg";
import { Pool } from "pg";
import { schema } from "schema.ts";

const pool = new Pool({
    connectionString: process.env.ZERO_UPSTREAM_DB!,
});
export const dbProvider = zeroNodePg(schema, pool);

// You can also pass a client instead of a pool:
//
// const client = new Client({
//   connectionString: process.env.ZERO_UPSTREAM_DB!
// })
// await client.connect()
// export const dbProvider = zeroNodePg(schema, client)

// Register the database provider for type safety
declare module "@rocicorp/zero" {
    interface DefaultTypes {
        dbProvider: typeof dbProvider;
    }
}
