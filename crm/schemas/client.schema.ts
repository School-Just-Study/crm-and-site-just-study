import { list } from '@keystone-6/core';
import { language } from '../fields/language';
import { decimal, relationship, select, text } from '@keystone-6/core/fields';
import { ClientStatusOptionsConst } from '../consts/client-status-options.const';
import { ClientStatus } from '../enums/client-status.emum';
import { LevelStudentOptions } from '../consts/level-student-options.const';
import { LevelStudent } from '../enums/level-student.enum';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { handleCreateUserWithEmailClient } from '../lib/handleCreateUserWithEmailClient';

export const Client = list({
    ui: {
        label: '🤓Лиды',
        listView: {
            initialColumns: ['id', 'name', 'language', 'email', 'phone', 'statusClient', 'comment'],
            initialSort: {
                field: 'lastModification',
                direction: 'DESC'
            },
            pageSize: 20
        },
        searchFields: ['name', 'email', 'comment', 'profession', 'goal']
    },
    fields: {
        language,
        name: text({ label: 'Имя, фамилия' }),
        email: text(),
        phone: decimal({
            scale: 0,
            ui: { description: 'Пример: 79991234567' },
            label: 'Телефон'
        }),
        statusClient: select({
            type: 'enum',
            options: ClientStatusOptionsConst,
            defaultValue: ClientStatus.New,
            label: 'Статус клиента'
        }),
        levelStudent: select({
            type: 'enum',
            options: LevelStudentOptions,
            defaultValue: LevelStudent.A1,
            label: 'Уровень подготовки'
        }),
        profession: text({ label: 'Профессия' }),
        goal: text({ label: 'Цель изучения' }),
        source: relationship({
            ref: 'SourceClient',
            label: 'Источник',
            many: true
        }),
        teachers: relationship({
            ref: 'Manager',
            many: true,
            label: 'Учителя'
        }),
        comment: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Комментарий'
        }),
        ymClientId: text({ label: 'ymClientId', ui: { itemView: { fieldMode: 'hidden' } } }),
        createdAt,
        lastModification
    },
    hooks: {
        afterOperation: handleCreateUserWithEmailClient
    },
    access: {
        operation: {
            delete: ({ session }) => !!session,
            query: () => true,
            create: () => true,
            update: () => true
        }
    }
});
