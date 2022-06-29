import { list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { LanguageOptions } from "../consts/language-options.const";
import { Language } from "../enums/language.enum";
import { Roles } from "../enums/roles.enum";

export const Subscription = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    name: text({ validation: { isRequired: true } }),
    visitCount: integer({
      defaultValue: 10,
      validation: { isRequired: true },
    }),
    price: integer({ validation: { isRequired: true } }),
    period: integer({ defaultValue: 45 }),
    product: relationship({ ref: "Product", many: true }),
    items: relationship({ ref: "UserSubscription.pattern", many: true }),
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
