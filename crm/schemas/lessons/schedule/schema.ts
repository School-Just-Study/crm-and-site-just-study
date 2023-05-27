import { list } from '@keystone-6/core';
import { calendarDay, relationship, select, text } from '@keystone-6/core/fields';
import { createdAt } from '../../../fields/createdAt';
import { lastModification } from '../../../fields/lastModification';
import { statusView } from '../../../fields/statusView';
import { allowAll } from '@keystone-6/core/access';
import { handleCreateLessons } from './hooks';
import { timezoneOptionsConst } from '../../../consts/timezone-options.const';

export const LessonSchedule = list({
    ui: {
        label: '🏫График занятий',
        listView: {
            initialColumns: ['id', 'students', 'teachers', 'statusView', 'startPeriod', 'endPeriod']
        }
    },
    fields: {
        statusView,
        students: relationship({ ref: 'User', many: true, label: 'Ученики' }),
        teachers: relationship({ ref: 'Manager', many: true, label: 'Учителя' }),
        schedule: relationship({
            ref: 'LessonScheduleItem',
            many: true,
            label: 'Расписание',
            ui: {
                displayMode: 'cards',
                cardFields: ['dayOfWeek', 'startTime', 'endTime'],
                inlineEdit: {
                    fields: ['dayOfWeek', 'startTime', 'endTime']
                },
                createView: { fieldMode: 'hidden' },
                inlineCreate: {
                    fields: ['dayOfWeek', 'startTime', 'endTime']
                }
            }
        }),
        startPeriod: calendarDay({
            validation: { isRequired: true },
            label: 'Начало расписания'
        }),
        endPeriod: calendarDay({
            validation: { isRequired: false },
            label: 'Конец расписания'
        }),
        timeZone: select({
            options: timezoneOptionsConst,
            type: 'string',
            validation: { isRequired: true },
            defaultValue: 'Europe/Moscow',
            label: 'Часовой пояс для графика'
        }),
        comment: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Комментарий'
        }),
        createdAt,
        lastModification
    },
    hooks: {
        afterOperation: handleCreateLessons
    },
    access: allowAll
});
