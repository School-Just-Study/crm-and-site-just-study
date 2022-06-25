import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status";
import { LanguageOptions } from "../consts/language-options.const";
import { Language } from "../enums/language.enum";

export const ProductReview = list({
  fields: {
    language: select({
      options: LanguageOptions,
      defaultValue: Language.Russian,
      ui: { displayMode: "segmented-control" },
    }),
    student: relationship({ ref: "User" }),
    products: relationship({ ref: "Product", many: true }),
    status: select({
      type: "enum",
      options: ViewStatusOptions,
      defaultValue: ViewStatus.Draft,
      ui: { displayMode: "segmented-control" },
    }),
    desc: text({ ui: { displayMode: "textarea" } }),
    media: text(),
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
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
