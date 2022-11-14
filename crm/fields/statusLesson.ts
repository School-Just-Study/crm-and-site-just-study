import { select } from '@keystone-6/core/fields';
import { LessonStatusOptions } from '../consts/lesson-status-options';
import { LessonStatus } from '../enums/lesson-status';

export const statusLesson = select({
  options: LessonStatusOptions,
  defaultValue: LessonStatus.Created,
  label: "Статус урока",
  ui: { displayMode: "segmented-control" },
  validation: { isRequired: true },
});
