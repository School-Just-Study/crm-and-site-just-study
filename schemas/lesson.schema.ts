import { list } from "@keystone-6/core";
import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const Lesson = list({
  fields: {
    title: text(),
    description: text(),
    date: timestamp({ validation: { isRequired: true } }),
    startTime: text({
      validation: { isRequired: true },
      ui: { description: "Начало урока" },
      defaultValue: "09:00",
    }),
    endTime: text({
      validation: { isRequired: true },
      ui: { description: "Окончание урока" },
      defaultValue: "10:00",
    }),
    status: checkbox({
      ui: { description: "Проведен ли урок?" },
      defaultValue: false,
    }),
    student: relationship({ ref: "Client", many: true }),
    subscriptions: relationship({
      ref: "UserSubscription.lessons",
      many: true,
    }),
    teacher: relationship({ ref: "Manager", many: true }),
    comment: text({
      ui: { displayMode: "textarea" },
      db: { nativeType: "VarChar(10000)" },
    }),
    createdAt,
    lastModification,
  },
});
