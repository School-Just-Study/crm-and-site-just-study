import { graphql, list } from '@keystone-6/core';
import { checkbox, integer, text, virtual } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { statusView } from '../fields/statusView';
import { Lists } from '.keystone/types';
import { getCurrencyForLanguage } from '../lib/getCurrency';
import { content } from '../fields/document';

export const Subscription = list({
    ui: {
        label: '🐣Шаблоны абонементов',
        labelField: 'label',
        listView: {
            initialColumns: ['id', 'label', 'language', 'statusView', 'visitCount', 'period']
        },
        searchFields: ['name']
    },
    fields: {
        language,
        // @ts-ignore
        label: virtual<Lists.Subscription.TypeInfo>({
            field: graphql.field({
                type: graphql.String,
                resolve(item) {
                    if (!item) return;
                    return `${item.name} - ${item.price} ${getCurrencyForLanguage('ru')}`;
                }
            })
        }),
        statusView,
        name: text({ validation: { isRequired: true }, label: 'Название' }),
        visitCount: integer({
            defaultValue: 10,
            label: 'Количество занятий'
        }),
        unlimited: checkbox({
            defaultValue: false,
            label: 'Безлимитное количество занятий'
        }),
        price: integer({ validation: { isRequired: true }, label: 'Стоимость' }),
        // @ts-ignore
        priceUSD: virtual<Lists.Subscription.TypeInfo>({
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
        period: integer({ defaultValue: 45, label: 'Длительность в днях' }),
        desc: content,
        trial: checkbox({
            defaultValue: false,
            label: 'Пробный урок'
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
