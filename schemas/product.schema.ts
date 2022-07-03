import { list } from "@keystone-6/core";
import { image, integer, relationship, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";

export const Product = list({
  ui: {
    label: "Курсы",
    labelField: "name",
    description: "Курсы, которые публикуются на сайте",
    listView: {
      initialColumns: [
        "language",
        "name",
        "statusView",
        "description",
        "categories",
        "price",
      ],
      pageSize: 20,
    },
  },
  fields: {
    language,
    statusView,
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: "textarea" } }),
    categories: relationship({ ref: "Category", many: true }),
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
