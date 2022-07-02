import { graphql, list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { StatusesOptions } from "../consts/statuses-options.const";
import { Statuses } from "../enums/statuses.enum";
import { Lists } from ".keystone/types";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const UserService = list({
  fields: {
    language,
    pattern: relationship({ ref: "Service.items" }),
    name: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.String,
        async resolve(item: Lists.UserService.Item, arg, context) {
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
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserService.Item, arg, context) {
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
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      create: ({ session }) => !!session && session.data.role !== Roles.Student,
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
