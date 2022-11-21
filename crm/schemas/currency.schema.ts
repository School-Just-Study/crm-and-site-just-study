import { list } from '@keystone-6/core';
import { integer, text } from '@keystone-6/core/fields';
import { isAdmin } from '../validation';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const Currency = list({
    ui: {
        isHidden: isAdmin
    },
    fields: {
        name: text({ ui: { description: 'Название' } }),
        charCode: text({
            isFilterable: true,
            validation: { isRequired: true },
            db: { isNullable: false },
            isIndexed: 'unique',
            ui: { description: 'Код валюты - например: USD' }
        }),
        Nominal: integer({ ui: { description: 'Цена за сколько единиц указано' } }),
        value: integer({ ui: { description: 'Курс' } }),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            query: () => true,
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin
        }
    }
});
