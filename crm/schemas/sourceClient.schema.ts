import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const SourceClient = list({
    ui: {
        label: 'ℹ️Источники клиентов',
        isHidden: true,
        labelField: 'name',
        listView: { initialColumns: ['name', 'parent'] }
    },
    fields: {
        name: text({
            validation: { isRequired: true },
            label: 'Категория'
        }),
        parent: relationship({ ref: 'SourceClient', label: 'Подкатегория' }),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            create: ({ session }) => !!session && session.data.role !== Roles.Student,
            update: ({ session }) => !!session && session.data.role !== Roles.Student,
            delete: ({ session }) => !!session && session.data.role !== Roles.Student,
            query: () => true
        }
    }
});
