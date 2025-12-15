import {
    table,
    string,
    createSchema,
    definePermissions,
    ANYONE_CAN_DO_ANYTHING,
    PermissionsConfig,
    boolean,
    number,
    Row,
} from "@rocicorp/zero";

type Authdata = {
    userID: string;
};

const users = table("users")
    .columns({ name: string(), email: string(), password: string() })
    .primaryKey("email");

const chess_games = table("chess_games")
    .columns({
        id: number(),
        white_player_name: string(),
        black_player_name: string(),
        fen: string(),
        is_active: boolean(),
        white_time: number(), // in seconds
        black_time: number(), // in seconds
    })
    .primaryKey("id");

export const schema = createSchema({
    tables: [users, chess_games],
});
export type Schema = typeof schema;
export type chess_games = Row<typeof schema.tables.chess_games>;
export type users = Row<typeof schema.tables.users>;
export const permissions = definePermissions<Authdata, Schema>(schema, () => {
    return {
        users: ANYONE_CAN_DO_ANYTHING,
        chess_games: ANYONE_CAN_DO_ANYTHING,
    } satisfies PermissionsConfig<Authdata, Schema>;
});
