import { list } from '@keystone-6/core';
import { checkbox, relationship, select, text } from '@keystone-6/core/fields';
import { DayOfWeekOptionsConst } from '../consts/dayOfWeek-options.const';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const WorkTime = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ["id", "dayOfWeek", "startTime", "endTime"],
    },
  },
  fields: {
    manager: relationship({ ref: "Manager.workTime", label: "Учитель" }),
    dayOfWeek: select({
      type: "integer",
      options: DayOfWeekOptionsConst,
      validation: { isRequired: true },
      label: "День недели",
    }),
    isDayOff: checkbox({
      defaultValue: false,
      label: "Это выходной день?",
    }),
    startTime: text({
      label: "Начало работы",
    }),
    endTime: text({
      label: "Окончание работы",
    }),
    createdAt,
    lastModification,
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true,
    },
  },
});
