import { graphql, list } from "@keystone-6/core";
import {
  checkbox,
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { StatusesOptions } from "../consts/statuses-options.const";
import { Statuses } from "../enums/statuses.enum";
import { Lists } from ".keystone/types";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { LessonStatus } from "../enums/lesson-status";

export const UserSubscription = list({
  ui: {
    label: "Студенты: абонементы",
    labelField: "name",
    listView: {
      initialColumns: [
        "id",
        "name",
        "visitCount",
        "price",
        "status",
        "student",
        "beginDate",
        "endDate",
        "lastCount",
      ],
      pageSize: 20,
    },
  },
  fields: {
    name: text({ label: "Название" }),
    visitCount: integer({ label: "Количество занятий" }),
    unlimited: checkbox({
      defaultValue: false,
      label: "Безлимитное количество занятий",
    }),
    originalPrice: integer({ label: "Оригинальная цена" }),
    price: integer({ label: "Цена продажи" }),
    status: select({
      options: StatusesOptions,
      ui: { displayMode: "segmented-control" },
      defaultValue: Statuses.Active,
      validation: { isRequired: true },
      label: "Статус абонемента",
    }),
    student: relationship({ ref: "User", label: "Клиенты" }),
    beginDate: timestamp({
      defaultValue: { kind: "now" },
      label: "Дата начала",
    }),
    endDate: timestamp({ label: "Дата окончания" }),
    totalVisited: virtual({
      label: "Посещено занятий",
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, ctx) {
          if (item.visitCount) {
            const lessons = await ctx.query.Lesson.findMany({
              where: {
                statusLesson: { equals: LessonStatus.Completed },
                subscription: { id: { equals: item.id } },
              },
            });
            return lessons.length;
          } else {
            return;
          }
        },
      }),
    }),
    customVisited: integer({
      defaultValue: 0,
      ui: { description: "Вручную указать сколько занятий было посещено" },
    }),
    lastCount: virtual({
      label: "Осталось занятий",
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, ctx) {
          if (item.visitCount) {
            const lesson = await ctx.query.UserSubscription.findOne({
              where: {
                id: `${item.id}`,
              },
              query: `totalVisited customVisited`,
            });
            return item.visitCount - lesson.totalVisited - lesson.customVisited;
          } else {
            return;
          }
        },
      }),
    }),
    lessons: relationship({
      ref: "Lesson.subscription",
      many: true,
      label: "Уроки",
    }),
    trial: checkbox({
      defaultValue: false,
      label: "Пробный урок",
    }),
    manager: relationship({ ref: "User" }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
      query: () => true,
      create: () => true,
      update: () => true,
    },
  },
});
