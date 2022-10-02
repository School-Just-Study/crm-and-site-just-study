import { list } from "@keystone-6/core";
import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { statusLesson } from "../fields/statusLesson";

export const Lesson = list({
  ui: {
    label: "Уроки",
    listView: {
      initialColumns: [
        "id",
        "title",
        "description",
        "startTime",
        "endTime",
        "statusLesson",
        "trial",
        "student",
      ],
    },
  },
  fields: {
    statusLesson,
    title: text(),
    description: text(),
    startTime: timestamp({
      validation: { isRequired: true },
      label: "Начало урока",
    }),
    endTime: timestamp({
      validation: { isRequired: true },
      label: "Окончание урока",
    }),
    trial: checkbox({
      label: "Пробный урок",
      defaultValue: false,
    }),
    student: relationship({ ref: "User", many: true }),
    subscriptions: relationship({
      ref: "UserSubscription.lessons",
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
