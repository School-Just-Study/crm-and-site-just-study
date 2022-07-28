import { list } from "@keystone-6/core";
import { image, relationship } from "@keystone-6/core/fields";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";

export const AvatarUser = list({
  ui: {
    label: "Аватарки пользователей",
    isHidden: true,
  },
  fields: {
    user: relationship({ ref: "User.avatar" }),
    image: image({ storage: "storage_image_avatars" }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
  },
});
