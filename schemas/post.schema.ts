import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { statusView } from "../fields/statusView";
import { image, relationship, text } from "@keystone-6/core/fields";
import { content } from "../fields/document";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const Post = list({
  ui: {
    label: "Блог",
    labelField: "title",
    listView: {
      initialColumns: ["title", "language", "statusView", "tag", "author"],
      pageSize: 20,
    },
  },
  fields: {
    language,
    statusView,
    cover: image({ storage: "storage_blog_image" }),
    title: text({ validation: { isRequired: true } }),
    description: text({
      validation: { isRequired: true },
      ui: {
        displayMode: "textarea",
        description: "Выделенный текст сверху страницы",
      },
      db: { nativeType: "VarChar(10000)" },
    }),
    content,
    tag: relationship({
      ref: "Tag",
      many: true,
    }),
    author: relationship({ ref: "User" }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
      query: () => true,
    },
  },
});
