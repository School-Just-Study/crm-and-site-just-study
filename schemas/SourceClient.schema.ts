import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const SourceClient = list({
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    parent: relationship({ ref: "SourceClient" }),
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
