import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";

export const ProductReview = list({
  fields: {
    user: relationship({ ref: "User" }),
    products: relationship({ ref: "Product", many: true }),
    desc: text({ ui: { displayMode: "textarea" } }),
    media: text(),
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
});
