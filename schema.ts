import {
    table,
    string,
    createSchema,
    definePermissions,
    ANYONE_CAN_DO_ANYTHING,
    PermissionsConfig,
    number,
    boolean,
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
        id: number(),
        whitePlayerName: string(),
        blackPlayerName: string(),
        fen: string(),
        is_active: boolean(),
    })
    .primaryKey("id");

export const schema = createSchema({
    tables: [z_chess_user, users, chess_games],
});
export type Schema = typeof schema;

export const permissions = definePermissions<Authdata, Schema>(schema, () => {
    return {
        z_chess_user: ANYONE_CAN_DO_ANYTHING,
        users: ANYONE_CAN_DO_ANYTHING,
        chess_games: ANYONE_CAN_DO_ANYTHING,
    } satisfies PermissionsConfig<Authdata, Schema>;
});
