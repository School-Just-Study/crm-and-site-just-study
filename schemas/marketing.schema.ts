import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { image, text } from "@keystone-6/core/fields";
import { statusView } from "../fields/statusView";
import { checkboxField } from "../fields/checkbox";

export const Marketing = list({
  ui: {
    label: "Лендинги",
    labelField: "title",
    listView: {
      initialColumns: [
        "language",
        "title",
        "statusView",
        "slug",
        "description",
      ],
    },
  },
  fields: {
    language,
    statusView,
    slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    image: image({ storage: "storage_marketing_image" }),
    title: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: "textarea",
        description: "Выделенный текст сверху страницы",
      },
      db: { nativeType: "VarChar(10000)" },
    }),
    aboutGeorge: checkboxField("Об основателе"),
    advantages: checkboxField("Чем мы отличаемся?"),
    reviews: checkboxField("Отзывы учеников"),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
  },
});
