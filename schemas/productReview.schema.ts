import { list } from "@keystone-6/core";
import { relationship, select, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const ProductReview = list({
  fields: {
    language,
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
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
