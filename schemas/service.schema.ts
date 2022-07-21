import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";
import { content } from "../fields/document";

export const Service = list({
  ui: {
    label: "Шаблоны услуг",
    labelField: "name",
    listView: {
      initialColumns: ["name", "language", "statusView", "categories", "price"],
    },
  },
  fields: {
    language,
    statusView,
    name: text({ validation: { isRequired: true } }),
    description: content,
    categories: relationship({ ref: "Category", many: true }),
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
