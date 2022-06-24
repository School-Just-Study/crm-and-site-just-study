import { list } from "@keystone-6/core";
import {
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { RolesValues } from "../consts/roles.const";
import { Roles } from "../enums/roles.enum";
import { filterCustomerAccess, filterCustomerAccessCreate } from "../shared";
import { LanguageOptions } from "../consts/language-options.const";
import { Language } from "../enums/language.enum";

export const User = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({
      validation: { isRequired: true, length: { min: 4 } },
    }),
    role: select({
      type: "enum",
      options: RolesValues,
      defaultValue: Roles.Student,
    }),
    address: relationship({ ref: "Address", many: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    lastModification: timestamp({
      defaultValue: { kind: "now" },
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: {
      query: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => filterCustomerAccess(session),
      update: ({ session }) => filterCustomerAccess(session),
      delete: ({ session }) => filterCustomerAccess(session),
    },
    item: {
      update: ({ session, inputData }) =>
        filterCustomerAccessCreate(session, inputData),
    },
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
});
