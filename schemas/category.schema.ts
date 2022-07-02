import { list } from "@keystone-6/core";
import { relationship, select, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const Category = list({
  fields: {
    language,
    name: text({
      validation: { isRequired: true },
    }),
    parent: relationship({ ref: "Category" }),
    products: relationship({ ref: "Product", many: true }),
    status: select({
      options: ViewStatusOptions,
      defaultValue: ViewStatus.Draft,
      ui: { displayMode: "segmented-control" },
    }),
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
