import { list } from "@keystone-6/core";
import { image, text, timestamp } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";

export const ProductImage = list({
  fields: {
    alt: text({ validation: { isRequired: true } }),
    image: image({ storage: "local_images" }),
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
  access: {
    operation: {
      create: ({ session }) => !!session && session.data.role !== Roles.Student,
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
