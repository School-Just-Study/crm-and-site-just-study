import { list } from '@keystone-6/core';
import { image, relationship, text } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { statusView } from '../fields/statusView';
import { content } from '../fields/document';

export const Product = list({
    ui: {
        label: '🔥Курсы',
        labelField: 'name',
        description: 'Курсы, которые публикуются на сайте',
        listView: {
            initialColumns: ['id', 'language', 'name', 'statusView', 'desc', 'category'],
            pageSize: 20
        }
    },
    fields: {
        language,
        statusView,
        name: text({ validation: { isRequired: true }, label: 'Название курса' }),
        description: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Краткое описание'
        }),
        desc: content,
        category: relationship({
            label: 'Категория',
            ref: 'Category',
            ui: {
                displayMode: 'cards',
                cardFields: ['language', 'name'],
                inlineEdit: { fields: ['language', 'name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['language', 'name'] },
                createView: { fieldMode: 'hidden' }
            }
        }),
        image: image({
            storage: 'storage_product_image',
            label: 'Изображение',
            ui: { createView: { fieldMode: 'hidden' } }
        }),
        tags: relationship({
            label: 'Теги',
            ref: 'Tag',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['language', 'name'],
                inlineEdit: { fields: ['language', 'name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['language', 'name'] },
                createView: { fieldMode: 'hidden' }
            }
        }),
        subscriptions: relationship({
            ref: 'Subscription',
            many: true,
            label: 'Абонементы',
            ui: {
                createView: { fieldMode: 'hidden' }
            }
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
