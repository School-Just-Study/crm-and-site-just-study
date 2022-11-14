import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { Lists } from ".keystone/types";
import { Roles } from "../enums/roles.enum";

export const handleCreateUserWithEmailManager: ListHooks<Lists.Client.TypeInfo>["afterOperation"] =
  async ({ context, item, operation }) => {
    if (operation === "update") {
      if (item && item.email) {
        let user = await context.query.User.findOne({
          where: { email: item.email },
          query: `id`,
        });

        const { name, email, language } = item;

        if (!user) {
          await context.query.User.createOne({
            data: {
              name,
              email,
              manager: { connect: { id: `${item.id}` } },
              language,
              role: Roles.Manager,
            },
            query: `id`,
          });
        } else {
          await context.query.User.updateOne({
            where: { email },
            data: {
              name,
              email,
              manager: { connect: { id: `${item.id}` } },
            },
            query: `id`,
          });
        }
      }
    }
  };
