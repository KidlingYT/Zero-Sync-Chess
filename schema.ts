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

const z_chess_user = table("z_chess_user")
    .columns({ id: string(), name: string() })
    .primaryKey("id");

const users = table("users")
    .columns({ name: string(), email: string(), password: string() })
    .primaryKey("email");

const chess_games = table("chess_games")
    .columns({
        id: string(),
        whitePlayerName: string(),
        blackPlayerName: string(),
        fen: string(),
        is_active: boolean(),
        whiteTime: number(), // in seconds
        blackTime: number(), // in seconds
    })
    .primaryKey("id");

export const schema = createSchema({
    tables: [z_chess_user, users, chess_games],
});
export type Schema = typeof schema;
export type chess_games = Row<typeof schema.tables.chess_games>;
export type users = Row<typeof schema.tables.users>;
export const permissions = definePermissions<Authdata, Schema>(schema, () => {
    return {
        z_chess_user: ANYONE_CAN_DO_ANYTHING,
        users: ANYONE_CAN_DO_ANYTHING,
        chess_games: ANYONE_CAN_DO_ANYTHING,
    } satisfies PermissionsConfig<Authdata, Schema>;
});
