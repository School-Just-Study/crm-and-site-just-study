import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { handlePatternForUserService } from "../lib/handlePatternForUserService";

export const UserService = list({
  ui: {
    label: "Студенты: услуги",
    listView: {
      initialColumns: [
        "name",
        "originalPrice",
        "price",
        "student",
        "payed",
        "manager",
      ],
      pageSize: 20,
    },
  },
  fields: {
    pattern: relationship({ ref: "Service.items" }),
    name: text(),
    originalPrice: integer(),
    price: integer(),
    student: relationship({ ref: "User" }),
    payed: integer(),
    manager: relationship({ ref: "User" }),
    createdAt,
    lastModification,
  },
  hooks: {
    resolveInput: handlePatternForUserService,
  },
  access: {
    operation: {
      create: ({ session }) => !!session && session.data.role !== Roles.Student,
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
