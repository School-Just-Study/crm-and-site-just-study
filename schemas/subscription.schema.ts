import { list } from "@keystone-6/core";
import { integer, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";
import { content } from "../fields/document";

export const Subscription = list({
  ui: {
    label: "Шаблоны абонементов",
    labelField: "name",
    listView: {
      initialColumns: [
        "name",
        "language",
        "statusView",
        "visitCount",
        "price",
        "period",
      ],
    },
  },
  fields: {
    language,
    statusView,
    name: text({ validation: { isRequired: true } }),
    description: content,
    visitCount: integer({
      defaultValue: 10,
      validation: { isRequired: true },
    }),
    price: integer({ validation: { isRequired: true } }),
    period: integer({ defaultValue: 45 }),
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
