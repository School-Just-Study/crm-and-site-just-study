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
import { Lists } from ".keystone/types";

export const UserSubscription = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    pattern: relationship({ ref: "Subscription.items" }),
    name: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.String,
        async resolve(item: Lists.UserSubscription.Item, arg, context) {
          const subscription = await context.query.Subscription.findOne({
            where: { id: `${item.patternId}` },
            query: `name`,
          });
          if (subscription) {
            return subscription.name;
          }
        },
      }),
    }),
    visitCount: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, context) {
          const subscription = await context.query.Subscription.findOne({
            where: { id: `${item.patternId}` },
            query: `visitCount`,
          });
          if (subscription) {
            return subscription.visitCount;
          }
        },
      }),
    }),
    originalPrice: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, context) {
          const subscription = await context.query.Subscription.findOne({
            where: { id: `${item.patternId}` },
            query: `price`,
          });
          if (subscription) {
            return subscription.price;
          }
        },
      }),
    }),
    price: integer({ validation: { isRequired: true } }),
    period: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, context) {
          const subscription = await context.query.Subscription.findOne({
            where: { id: `${item.patternId}` },
            query: `period`,
          });
          if (subscription) {
            return subscription.period;
          }
        },
      }),
    }),
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
    endDate: timestamp(),
    payed: integer(),
    totalVisited: integer({ defaultValue: 0 }),
    totalBurned: integer({ defaultValue: 0 }),
    lastCount: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, context) {
          const subscription = await context.query.Subscription.findOne({
            where: { id: `${item.patternId}` },
            query: `visitCount`,
          });
          if (subscription) {
            return (
              subscription.visitCount - item.totalVisited! - item.totalBurned!
            );
          }
          return;
        },
      }),
    }),
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
