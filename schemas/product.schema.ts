import { list } from "@keystone-6/core";
import {
  decimal,
  image,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status";
import { Roles } from "../enums/roles.enum";
import { LanguageOptions } from "../consts/language-options.const";
import { Language } from "../enums/language.enum";

export const Product = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: "textarea" } }),
    categories: relationship({ ref: "Category", many: true }),
    status: select({
      type: "enum",
      options: ViewStatusOptions,
      defaultValue: ViewStatus.Draft,
      ui: { displayMode: "segmented-control" },
    }),
    images: image({ storage: "local_images" }),
    price: decimal({ scale: 0 }),
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
