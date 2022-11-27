import { list } from '@keystone-6/core';
import { checkbox, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { statusLesson } from '../fields/statusLesson';
import { handleNotificationStudentAndTeacherLesson } from '../lib/handleNotificationStudentAndTeacherLesson';
import { handleCheckBookingLesson } from '../lib/handleCheckBookingLesson';
import { TimezoneOptionsConst } from '../consts/timezone-options.const';

export const Lesson = list({
    ui: {
        label: '📚Уроки',
        listView: {
            initialColumns: ['id', 'students', 'statusLesson', 'startTime', 'endTime', 'trial', 'timeZone'],
            initialSort: { field: 'statusLesson', direction: 'DESC' }
        }
    },
    fields: {
        statusLesson,
        title: text({ label: 'Заголовок' }),
        description: text({ label: 'Описание' }),
        startTime: timestamp({
            validation: { isRequired: true },
            label: 'Начало урока'
        }),
        endTime: timestamp({
            validation: { isRequired: true },
            label: 'Окончание урока'
        }),
        trial: checkbox({
            label: 'Пробный урок',
            defaultValue: false
        }),
        burned: checkbox({
            label: 'Урок сгорел',
            defaultValue: false
        }),
        students: relationship({ ref: 'User', many: true, label: 'Клиент' }),
        subscription: relationship({
            ref: 'UserSubscription.lessons',
            label: 'Абонемент'
        }),
        teachers: relationship({ ref: 'Manager', many: true, label: 'Учителя' }),
        comment: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Комментарий'
        }),
        timeZone: select({
            options: TimezoneOptionsConst,
            type: 'string',
            validation: { isRequired: true },
            defaultValue: 'Europe/Moscow',
            label: 'Часовой пояс'
        }),
        notified: checkbox({ label: 'Уведомление о начале урока' }),
        createdAt,
        lastModification
    },
    hooks: {
        validateInput: handleCheckBookingLesson,
        afterOperation: handleNotificationStudentAndTeacherLesson
    },
    access: {
        operation: {
            query: () => true,
            create: () => true,
            update: () => true,
            delete: () => true
        }
    }
});
