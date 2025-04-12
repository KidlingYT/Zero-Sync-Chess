import {
  table,
  string,
  createSchema,
  definePermissions,
  ANYONE_CAN_DO_ANYTHING,
  PermissionsConfig,
} from "@rocicorp/zero";

type Authdata = {
  userID: string;
};

const zChessUser = table("zChessUser")
  .columns({ id: string(), name: string() })
  .primaryKey("id");

export const schema = createSchema({ tables: [zChessUser] });
export type Schema = typeof schema;

export const permissions = definePermissions<Authdata, Schema>(schema, () => {
  return {
    zChessUser: ANYONE_CAN_DO_ANYTHING,
  } satisfies PermissionsConfig<Authdata, Schema>;
});
