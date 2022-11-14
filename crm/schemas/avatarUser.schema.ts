import { list } from '@keystone-6/core';
import { image, relationship } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const AvatarUser = list({
  ui: {
    label: "Аватарки пользователей",
    isHidden: true,
  },
  fields: {
    user: relationship({ ref: "User.avatar", label: "Клиент" }),
    image: image({ storage: "storage_image_avatars", label: "Изображение" }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      query: () => true,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
  },
});
