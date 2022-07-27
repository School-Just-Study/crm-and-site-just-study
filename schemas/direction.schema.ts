import { list } from "@keystone-6/core";
import { language } from "../fields/language";
import { statusView } from "../fields/statusView";
import { image, relationship, text } from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { Roles } from "../enums/roles.enum";

export const Direction = list({
  ui: {
    label: "Направления курсов",
    labelField: "name",
    description: "Направления курсов",
    listView: { initialColumns: ["id", "name", "description", "language"] },
  },
  fields: {
    language,
    statusView,
    name: text({
      validation: { isRequired: true },
    }),
    description: text({
      ui: { displayMode: "textarea" },
      db: { nativeType: "VarChar(10000)" },
    }),
    images: image({ storage: "storage_product_image" }),
    goals: relationship({
      ref: "DirectionGoal",
      many: true,
      ui: {
        description: "Блок: Для каких целей подойдет этот курс",
        displayMode: "cards",
        cardFields: ["statusView", "image", "name"],
        inlineEdit: { fields: ["statusView", "image", "name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["statusView", "image", "name"] },
      },
    }),
    results: relationship({
      ref: "DirectionResult",
      many: true,
      ui: {
        description: "Блок: Чему вы научитесь",
        displayMode: "cards",
        cardFields: ["statusView", "name"],
        inlineEdit: { fields: ["statusView", "name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["statusView", "name"] },
      },
    }),
    products: relationship({ ref: "Product", many: true }),
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
