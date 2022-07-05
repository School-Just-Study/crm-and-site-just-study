import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { text } from "@keystone-6/core/fields";

export const Tag = list({
  ui: {
    label: "Теги",
    isHidden: true,
    labelField: "name",
    listView: { initialColumns: ["name", "language"] },
  },
  fields: {
    language,
    name: text({ validation: { isRequired: true } }),
    createdAt,
    lastModification,
  },
});
