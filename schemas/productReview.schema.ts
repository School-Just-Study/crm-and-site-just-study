import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";

export const ProductReview = list({
  fields: {
    language,
    statusView,
    student: relationship({ ref: "User" }),
    products: relationship({ ref: "Product", many: true }),
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
