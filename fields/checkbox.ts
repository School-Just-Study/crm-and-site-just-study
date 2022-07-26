import { checkbox } from "@keystone-6/core/fields";

export const checkboxField = (description: string) =>
  checkbox({
    ui: { description },
    defaultValue: true,
    graphql: {
      read: {
        isNonNull: true,
      },
      create: {
        isNonNull: true,
      },
    },
  });
