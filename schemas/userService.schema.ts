import { graphql, list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { LanguageOptions } from "../consts/language-options.const";
import { Language } from "../enums/language.enum";
import { Roles } from "../enums/roles.enum";
import { StatusesOptions } from "../consts/statuses-options.const";
import { Statuses } from "../enums/statuses.enum";

export const UserService = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    pattern: relationship({ ref: "Service.items" }),
    name: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, arg, context) {
          const service = await context.query.Service.findOne({
            where: { id: `${item.patternId}` },
            query: `name`,
          });
          if (service) {
            return service.name;
          }
        },
      }),
    }),
    originalPrice: virtual({
      field: graphql.field({
        type: graphql.Int,
        async resolve(item, arg, context) {
          const service = await context.query.Service.findOne({
            where: { id: `${item.patternId}` },
            query: `price`,
          });
          if (service) {
            return service.price;
          }
        },
      }),
    }),
    price: integer({ validation: { isRequired: true } }),
    status: select({
      options: StatusesOptions,
      ui: { displayMode: "segmented-control" },
      defaultValue: Statuses.Inactive,
      validation: { isRequired: true },
    }),
    student: relationship({ ref: "User" }),
    beginDate: timestamp({
      defaultValue: { kind: "now" },
    }),
    payed: integer(),
    manager: relationship({ ref: "User" }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: { createView: { fieldMode: "hidden" } },
    }),
    lastModification: timestamp({
      defaultValue: { kind: "now" },
      ui: { createView: { fieldMode: "hidden" } },
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: {
      create: ({ session }) => !!session && session.data.role !== Roles.Student,
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
