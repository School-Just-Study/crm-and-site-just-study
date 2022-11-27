import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const Category = list({
    ui: {
        label: '✨Категории курсов',
        labelField: 'name',
        isHidden: true,
        listView: { initialColumns: ['id', 'name', 'language', 'products'] }
    },
    fields: {
        language,
        name: text({
            validation: { isRequired: true },
            label: 'Название'
        }),
        products: relationship({ ref: 'Product', many: true, label: 'Курс' }),
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
