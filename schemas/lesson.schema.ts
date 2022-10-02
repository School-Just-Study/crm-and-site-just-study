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
import { handleNotificationStudentAndTeacherLesson } from "../lib/handleNotificationStudentAndTeacherLesson";

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
        "students",
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
    students: relationship({ ref: "User", many: true }),
    subscriptions: relationship({
      ref: "UserSubscription.lessons",
    }),
    teachers: relationship({ ref: "Manager", many: true }),
    comment: text({
      ui: { displayMode: "textarea" },
      db: { nativeType: "VarChar(10000)" },
    }),
    timeZone: text(),
    notified: checkbox(),
    createdAt,
    lastModification,
  },
  hooks: {
    afterOperation: handleNotificationStudentAndTeacherLesson,
  },
});
