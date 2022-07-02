import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const Page = list({
  fields: {
    language,
    createdAt,
    lastModification,
  },
});
