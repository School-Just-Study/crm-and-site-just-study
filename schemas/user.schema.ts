import { list } from "@keystone-6/core";
import { password, relationship, select, text } from "@keystone-6/core/fields";
import { RolesValues } from "../consts/roles.const";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const User = list({
  ui: {
    label: "Пользователи",
    listView: {
      initialColumns: ["id", "name", "language", "email", "role", "comment"],
      initialSort: {
        field: "createdAt",
        direction: "DESC",
      },
      pageSize: 20,
    },
  },
  fields: {
    language,
    avatar: relationship({
      ref: "AvatarUser.user",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["image"],
        inlineEdit: { fields: ["image"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["image"] },
      },
    }),
    name: text(),
    email: text({
      isIndexed: "unique",
      isFilterable: true,
      validation: { isRequired: true },
    }),
    password: password({
      validation: { length: { min: 4 } },
    }),
    role: select({
      type: "enum",
      options: RolesValues,
      defaultValue: Roles.Student,
    }),
    comment: text({
      ui: { displayMode: "textarea" },
      db: { nativeType: "VarChar(10000)" },
    }),
    client: relationship({ ref: "Client" }),
    manager: relationship({ ref: "Manager" }),
    cart: relationship({ ref: "Cart.user" }),
    magicLinkToken: text({
      ui: { listView: "hidden", itemView: "hidden", createView: "hidden" },
    }),
    createdAt,
    lastModification,
  },
  hooks: {
    afterOperation: async ({ operation, item, context }) => {
      if (operation !== "create") {
        return;
      }
      const userId = item?.id;
      await context.prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
    },
  },
  access: {
    operation: {
      delete: ({ session }) => !!session,
      query: () => true,
      create: () => true,
      update: () => true,
    },
  },
});
