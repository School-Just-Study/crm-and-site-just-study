import { list } from '@keystone-6/core';
import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { StatusesOptions } from '../consts/statuses-options.const';
import { Statuses } from '../enums/statuses.enum';
import { EditOnlyAdminForUi } from '../validation';

export const UserService = list({
    ui: {
        label: '🤙🏻Студенты: услуги',
        listView: {
            initialColumns: ['id', 'name', 'originalPrice', 'price', 'student', 'manager'],
            pageSize: 20
        }
    },
    fields: {
        name: text({ label: 'Название' }),
        status: select({
            options: StatusesOptions,
            ui: { displayMode: 'segmented-control' },
            defaultValue: Statuses.Finished,
            validation: { isRequired: true },
            label: 'Статус'
        }),
        originalPrice: integer({
            label: 'Оригинальная цена',
            ui: {
                itemView: { fieldMode: 'read' }
            }
        }),
        price: integer({
            label: 'Цена продажи',
            ui: {
                itemView: { fieldMode: 'read' }
            }
        }),
        student: relationship({ ref: 'User', label: 'Клиент', ui: { itemView: { fieldMode: EditOnlyAdminForUi } } }),
        manager: relationship({ ref: 'User' }),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            delete: ({ session }) => !!session && session.data.role !== Roles.Student,
            query: () => true,
            create: () => true,
            update: () => true
        }
    }
});
