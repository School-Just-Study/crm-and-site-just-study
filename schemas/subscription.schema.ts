import { list } from "@keystone-6/core";
import {
  decimal,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { LanguageOptions } from "../consts/language-options.const";
import { Language } from "../enums/language.enum";
import { Roles } from "../enums/roles.enum";
import { StatusesOptions } from "../consts/statuses-options.const";
import { Statuses } from "../enums/statuses.enum";

export const Subscription = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    name: text({ validation: { isRequired: true } }),
    status: select({
      options: StatusesOptions,
      ui: { displayMode: "segmented-control" },
      defaultValue: Statuses.Inactive,
      validation: { isRequired: true },
    }),
    student: relationship({ ref: "User" }),
    product: relationship({ ref: "Product", many: true }),
    visitCount: decimal({
      scale: 0,
      defaultValue: "10",
      validation: { isRequired: true },
    }),
    price: decimal({ scale: 0, validation: { isRequired: true } }),
    period: decimal({ scale: 0, defaultValue: "45" }),
    start: timestamp({
      defaultValue: { kind: "now" },
    }),
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
