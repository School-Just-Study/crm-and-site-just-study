import { list } from '@keystone-6/core';
import { checkbox, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { createdAt } from '../../fields/createdAt';
import { lastModification } from '../../fields/lastModification';
import { fields } from './fields';
import {
    handleCheckBookingLesson,
    handleNotificationStudentAndTeacherLesson,
    handleSetSubscriptionIfEmpty
} from './hooks';
import { timezoneOptionsConst } from '../../consts/timezone-options.const';
import { createOnlyAdminForUi, EditOnlyAdminForUi } from '../../validation';
import { allowAll } from '@keystone-6/core/access';

export const Lesson = list({
    ui: {
        label: '📚Уроки',
        listView: {
            initialColumns: ['id', 'students', 'statusLesson', 'startTime', 'endTime', 'trial', 'timeZone'],
            initialSort: { field: 'statusLesson', direction: 'DESC' }
        }
    },
    fields: {
        statusLesson: fields,
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
            label: 'Абонемент',
            ui: {
                description: 'Не обязательно указывать, установится автоматически при наличии активного абонемента'
            }
        }),
        teachers: relationship({ ref: 'Manager', many: true, label: 'Учителя' }),
        comment: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Комментарий'
        }),
        timeZone: select({
            options: timezoneOptionsConst,
            type: 'string',
            validation: { isRequired: true },
            defaultValue: 'Europe/Moscow',
            label: 'ДЛЯ УВЕДОМЛЕНИЯ В ПИСЬМЕ Часовой пояс',
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi },
                createView: { fieldMode: createOnlyAdminForUi }
            }
        }),
        notified: checkbox({
            label: 'ДОСТАВЛЕНО уведомление о начале урока',
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi },
                createView: { fieldMode: createOnlyAdminForUi }
            }
        }),
        notAlert: checkbox({
            label: 'Создано из графика',
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi },
                createView: { fieldMode: createOnlyAdminForUi }
            }
        }),
        createdAt,
        lastModification
    },
    hooks: {
        resolveInput: handleSetSubscriptionIfEmpty,
        validateInput: handleCheckBookingLesson,
        afterOperation: handleNotificationStudentAndTeacherLesson
    },
    access: allowAll
});
