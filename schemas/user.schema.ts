import { list } from "@keystone-6/core";
import {
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { RolesValues } from "../consts/roles.const";
import { Roles } from "../enums/roles.enum";

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    role: select({
      type: "enum",
      options: RolesValues,
      defaultValue: Roles.Student,
    }),
    address: relationship({ ref: "Address", many: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    lastModification: timestamp({
      defaultValue: { kind: "now" },
      db: {
        updatedAt: true,
      },
    }),
  },
});
