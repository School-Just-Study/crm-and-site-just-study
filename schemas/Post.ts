import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { Lists } from ".keystone/types";

export const Post: Lists.Post = list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: "unique", isFilterable: true }),
    content: text(),
  },
});
