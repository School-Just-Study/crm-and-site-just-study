import { graphql, list } from '@keystone-6/core';
import { integer, relationship, text, virtual } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { statusView } from '../fields/statusView';
import { content } from '../fields/document';
import { getCurrencyForLanguage } from '../lib/getCurrency';
import { Lists } from '.keystone/types';

export const Service = list({
    ui: {
        label: '🧑🏼‍🔧Шаблоны услуг',
        labelField: 'label',
        listView: {
            initialColumns: ['id', 'label', 'language', 'statusView', 'categories']
        },
        searchFields: ['name']
    },
    fields: {
        language,
        label: virtual({
            // @ts-ignore
            field: graphql.field({
                type: graphql.String,
                resolve(item: Lists.Service.Item) {
                    if (!item) return;
                    return `${item.name} - ${item.price} ${getCurrencyForLanguage(item.language)}`;
                }
            })
        }),
        statusView,
        name: text({ validation: { isRequired: true }, label: 'Название' }),
        description: content,
        categories: relationship({
            ref: 'Category',
            many: true,
            label: 'Категории'
        }),
        price: integer({ defaultValue: 0, label: 'Цена' }),
        // @ts-ignore
        priceUSD: virtual<Lists.Service.TypeInfo>({
            label: 'Стоимость в долларах',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    if (item.price) {
                        const currencyUSD = await context.query.Currency.findOne({
                            where: { charCode: 'USD' },
                            query: `value`
                        });
                        const amountUsd = item.price / currencyUSD.value;
                        return Math.ceil(amountUsd);
                    }
                    return;
                }
            })
        }),
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
