import { list } from "@keystone-6/core";
import { checkbox, image, relationship, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusView } from "../fields/statusView";
import { content } from "../fields/document";

export const Product = list({
  ui: {
    label: "Курсы",
    labelField: "name",
    description: "Курсы, которые публикуются на сайте",
    listView: {
      initialColumns: ["language", "name", "statusView", "desc", "category"],
      pageSize: 20,
    },
  },
  fields: {
    language,
    statusView,
    name: text({ validation: { isRequired: true } }),
    desc: content,
    category: relationship({
      ref: "Category",
      ui: {
        displayMode: "cards",
        cardFields: ["language", "name"],
        inlineEdit: { fields: ["language", "name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["language", "name"] },
      },
    }),
    image: image({ storage: "storage_product_image" }),
    tags: relationship({
      ref: "Tag",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["language", "name"],
        inlineEdit: { fields: ["language", "name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["language", "name"] },
      },
    }),
    subscriptions: relationship({ ref: "Subscription", many: true }),
    trial: checkbox({
      defaultValue: false,
      ui: { description: "Пробный урок" },
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
