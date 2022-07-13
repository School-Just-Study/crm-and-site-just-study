import { list } from "@keystone-6/core";
import {
  decimal,
  password,
  relationship,
  select,
  text,
} from "@keystone-6/core/fields";
import { RolesValues } from "../consts/roles.const";
import { Roles } from "../enums/roles.enum";
import { filterCustomerAccess, filterCustomerAccessCreate } from "../shared";
import { ClientStatusOptionsConst } from "../consts/client-status-options.const";
import { ClientStatus } from "../enums/client-status.emum";
import { LevelStudentOptions } from "../consts/level-student-options.const";
import { LevelStudent } from "../enums/level-student.enum";
import { language } from "../fields/language";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const User = list({
  ui: {
    label: "Пользователи",
    listView: {
      initialColumns: [
        "name",
        "language",
        "email",
        "phone",
        "statusClient",
        "role",
        "comment",
      ],
      pageSize: 20,
    },
  },
  fields: {
    language,
    avatar: relationship({
      ref: "AvatarUser.user",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["image"],
        inlineEdit: { fields: ["image"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["image"] },
      },
    }),
    name: text({ validation: { isRequired: true } }),
    email: text({
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({
      validation: { length: { min: 4 } },
    }),
    phone: decimal({
      validation: {
        isRequired: true,
      },
      scale: 0,
      ui: { description: "Пример: 79991234567" },
    }),
    statusClient: select({
      type: "enum",
      options: ClientStatusOptionsConst,
      defaultValue: ClientStatus.New,
      label: "Статус клиента",
    }),
    levelStudent: select({
      type: "enum",
      options: LevelStudentOptions,
      defaultValue: LevelStudent.A1,
      label: "Уровень подготовки",
    }),
    goal: text({ label: "Цель изучения" }),
    source: relationship({
      ref: "SourceClient",
      label: "Источник",
      many: true,
    }),
    role: select({
      type: "enum",
      options: RolesValues,
      defaultValue: Roles.Student,
    }),
    comment: text(),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      update: ({ session }) => filterCustomerAccess(session),
      delete: ({ session }) => filterCustomerAccess(session),
    },
    item: {
      update: ({ session, inputData }) =>
        filterCustomerAccessCreate(session, inputData),
    },
  },
  hooks: {
    afterOperation: async ({ operation, item, context }) => {
      if (operation !== "create") {
        return;
      }
      const userId = item?.id;
      await context.prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
    },
  },
});
