import { select } from '@keystone-6/core/fields';
import { LessonStatusOptions } from './options';
import { LessonStatus } from './enum';

export const fields = select({
    options: LessonStatusOptions,
    defaultValue: LessonStatus.Created,
    label: 'Статус урока',
    ui: { displayMode: 'segmented-control' },
    validation: { isRequired: true }
});
