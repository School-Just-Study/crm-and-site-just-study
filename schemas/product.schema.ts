import { list } from "@keystone-6/core";
import {
  image,
  integer,
  relationship,
  select,
  text,
} from "@keystone-6/core/fields";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const Product = list({
  fields: {
    language,
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
    price: integer({ defaultValue: 0 }),
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
