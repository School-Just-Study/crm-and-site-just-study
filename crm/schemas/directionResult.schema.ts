import { list } from '@keystone-6/core';
import { statusView } from '../fields/statusView';
import { text } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { Roles } from '../enums/roles.enum';

export const DirectionResult = list({
  ui: {
    label: "Результат направления",
    description: "Блок: Чему вы научитесь",
    isHidden: true,
    labelField: "name",
  },
  fields: {
    statusView,
    name: text({
      validation: { isRequired: true },
      label: "Заголовок",
    }),
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
