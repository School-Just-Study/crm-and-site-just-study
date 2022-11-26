import { list } from '@keystone-6/core';
import { integer, text } from '@keystone-6/core/fields';
import { isAdmin } from '../validation';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { ISession } from '../types';
import { Roles } from '../enums/roles.enum';

export const Currency = list({
    ui: {
        isHidden: ({ session }: { session: ISession }) => session?.data.role !== Roles.Admin,
        label: 'Валюты',
        hideCreate: ({ session }: { session: ISession }) => session?.data.role !== Roles.Admin
    },
    fields: {
        charCode: text({
            isFilterable: true,
            validation: { isRequired: true },
            db: { isNullable: false },
            isIndexed: 'unique',
            defaultValue: 'USD',
            ui: { description: 'Код валюты - например: USD' }
        }),
        nominal: integer({
            ui: { description: 'Цена за сколько единиц указано' },
            defaultValue: 1,
            validation: { isRequired: true }
        }),
        value: integer({ ui: { description: 'Курс' }, validation: { isRequired: true } }),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            query: () => true,
            create: () => true,
            update: () => true,
            delete: isAdmin
        }
    }
});
