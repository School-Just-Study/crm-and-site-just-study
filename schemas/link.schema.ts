import { graphql, list } from "@keystone-6/core";
import { select, text, virtual } from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { LinkStatusOptions } from "../consts/link-status-options.const";
import { LinkStatus } from "../enums/link-status.enum";
import { FRONTEND_URL } from "../config";

export const Link = list({
  ui: {
    label: "Сокращатель ссылок",
    description: "Утилита позволяет сократить длинные ссылки",
  },
  fields: {
    label: virtual({
      label: "Ссылка",
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          // @ts-ignore
          return `${FRONTEND_URL}/l/${item.id}`;
        },
      }),
    }),
    status: select({
      options: LinkStatusOptions,
      defaultValue: LinkStatus.Active,
      ui: { displayMode: "segmented-control" },
      validation: { isRequired: true },
      label: "Статус ссылки",
    }),
    link: text({
      validation: { isRequired: true },
      label: "Ссылка для сокращения",
    }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
      query: () => true,
    },
  },
  db: {
    idField: { kind: "cuid" },
  },
});
