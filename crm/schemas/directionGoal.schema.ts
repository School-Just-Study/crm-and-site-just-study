import { list } from '@keystone-6/core';
import { statusView } from '../fields/statusView';
import { image, text } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { Roles } from '../enums/roles.enum';

export const DirectionGoal = list({
  ui: {
    label: "Цели направления",
    description: "Блок: Для каких целей подойдет этот курс",
    isHidden: true,
    labelField: "name",
  },
  fields: {
    statusView,
    name: text({
      validation: { isRequired: true },
      label: "Заголовок",
    }),
    image: image({ storage: "storage_product_image", label: "Обложка" }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      create: ({ session }) => !!session && session.data.role !== Roles.Student,
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
      query: () => true,
    },
  },
});
