import { KeystoneConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { Roles } from "../enums/roles.enum";

const accessRoles = [Roles.Admin, Roles.Manager];

export const ui: KeystoneConfig["ui"] = {
  isAccessAllowed: async (ctx) => {
    const userId = ctx.session.itemId;
    const user = await ctx.query.User.findOne({
      where: { id: userId },
      query: "role",
    });

    return accessRoles.includes(user.role);
  },
};
