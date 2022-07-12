import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { document } from "@keystone-6/fields-document";
import { relationship, text } from "@keystone-6/core/fields";
import { statusView } from "../fields/statusView";
import { handleSlugForPage } from "../lib/handleSlugForPage";

export const Page = list({
  ui: {
    label: "Страницы",
    labelField: "title",
    listView: {
      initialColumns: ["title", "language", "statusView", "tag", "author"],
      pageSize: 20,
    },
  },
  fields: {
    language,
    statusView,
    title: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: true }),
    description: text({
      ui: {
        displayMode: "textarea",
        description: "Выделенный текст сверху страницы",
      },
      db: { nativeType: "VarChar(10000)" },
    }),
    content: document({
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          code: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        alignment: {
          center: true,
          end: true,
        },
        headingLevels: [2, 3, 4, 5, 6],
        blockTypes: {
          blockquote: true,
          code: true,
        },
        softBreaks: true,
      },
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
    }),
    tag: relationship({
      ref: "Tag",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
    }),
    author: relationship({ ref: "User" }),
    createdAt,
    lastModification,
  },
  hooks: {
    resolveInput: handleSlugForPage,
  },
});
