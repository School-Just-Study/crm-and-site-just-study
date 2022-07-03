import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { relationship, text } from "@keystone-6/core/fields";

export const Tag = list({
  fields: {
    language,
    title: text({ validation: { isRequired: true } }),
    category: relationship({ ref: "Category", many: true }),
    createdAt,
    lastModification,
  },
});
