import { list } from '@keystone-6/core';
import { language } from '../fields/language';
import { checkbox, decimal, relationship, select, text } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { handleCreateUserWithEmailManager } from '../lib/handleCreateUserWithEmailManager';
import { TimezoneOptionsConst } from '../consts/timezone-options.const';

export const Manager = list({
  ui: {
    label: "Работники",
    listView: {
      initialColumns: [
        "id",
        "name",
        "email",
        "phone",
        "work",
        "teacher",
        "comment",
      ],
      pageSize: 20,
    },
  },
  fields: {
    language,
    name: text({ label: "Имя, Фамилия" }),
    email: text(),
    phone: decimal({
      scale: 0,
      ui: { description: "Пример: 79991234567" },
      label: "Телефон",
    }),
    work: checkbox({ defaultValue: true, label: "Работает" }),
    teacher: checkbox({ defaultValue: true, label: "Преподает" }),
    linkOnlineLesson: text({ label: "Ссылка на онлайн урок" }),
    workTime: relationship({
      ref: "WorkTime.manager",
      many: true,
      label: "Рабочее время",
      ui: {
        displayMode: "cards",
        cardFields: ["dayOfWeek", "startTime", "endTime", "isDayOff"],
        inlineEdit: {
          fields: ["dayOfWeek", "startTime", "endTime", "isDayOff"],
        },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: {
          fields: ["dayOfWeek", "startTime", "endTime", "isDayOff"],
        },
      },
    }),
    cutoff: relationship({
      ref: "WorkTimeCutoff.manager",
      many: true,
      label: "Часы неработы",
    }),
    timeZone: select({
      options: TimezoneOptionsConst,
      type: "string",
      validation: { isRequired: true },
      defaultValue: "Europe/Moscow",
      label: "Часовой пояс",
    }),
    calendar: text({label: "Ссылка на календарь"}),
    comment: text({
      ui: { displayMode: "textarea" },
      db: { nativeType: "VarChar(10000)" },
      label: "Комментарий",
    }),
    createdAt,
    lastModification,
  },
  hooks: {
    afterOperation: handleCreateUserWithEmailManager,
  },
  access: {
    operation: {
      delete: ({ session }) => !!session,
      query: () => true,
      create: () => true,
      update: () => true,
    },
  },
});
