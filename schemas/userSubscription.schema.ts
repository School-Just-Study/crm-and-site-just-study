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
import { addDays } from "date-fns";
import format from "date-fns/format";
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
        "period",
        "status",
        "student",
        "beginDate",
        "endDate",
        "lastCount",
        "manager",
      ],
      pageSize: 20,
    },
  },
  fields: {
    name: text(),
    visitCount: integer(),
    unlimited: checkbox({
      defaultValue: false,
      ui: { description: "Безлимитное количество занятий" },
    }),
    originalPrice: integer(),
    price: integer(),
    period: integer({
      ui: { description: "Количество дней, которое действует абонемент" },
    }),
    status: select({
      options: StatusesOptions,
      ui: { displayMode: "segmented-control" },
      defaultValue: Statuses.Inactive,
      validation: { isRequired: true },
    }),
    student: relationship({ ref: "User" }),
    beginDate: timestamp({
      defaultValue: { kind: "now" },
    }),
    endDate: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: Lists.UserSubscription.Item) {
          if (item.period && item.beginDate) {
            const endDate = addDays(new Date(item.beginDate), item.period);
            return format(endDate, "yyyy-MM-dd");
          } else {
            return;
          }
        },
      }),
      ui: {
        description: "Рассчитывается автоматически от длительности периода",
      },
    }),
    totalVisited: virtual({
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
    lastCount: virtual({
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.UserSubscription.Item, arg, ctx) {
          if (item.visitCount) {
            const lesson = await ctx.query.UserSubscription.findOne({
              where: {
                id: `${item.id}`,
              },
              query: `totalVisited`,
            });
            return item.visitCount - lesson.totalVisited;
          } else {
            return;
          }
        },
      }),
    }),
    lessons: relationship({ ref: "Lesson.subscription", many: true }),
    trial: checkbox({
      defaultValue: false,
      ui: { description: "Пробный урок" },
    }),
    manager: relationship({ ref: "User" }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
