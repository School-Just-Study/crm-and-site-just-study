import { list } from '@keystone-6/core';
import { language } from '../fields/language';
import { statusView } from '../fields/statusView';
import { image, relationship, text } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { Roles } from '../enums/roles.enum';

export const Direction = list({
    ui: {
        label: 'Направления курсов',
        labelField: 'name',
        description: 'Направления курсов',
        listView: {
            initialColumns: ['id', 'name', 'description', 'statusView', 'language']
        }
    },
    fields: {
        language,
        statusView,
        slug: text({
            validation: { isRequired: true },
            isIndexed: true,
            isFilterable: true,
            label: 'Путь к странице'
        }),
        name: text({
            validation: { isRequired: true },
            label: 'Название'
        }),
        description: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Описание'
        }),
        image: image({
            storage: 'storage_product_image',
            label: 'Баннер',
            ui: {
                createView: { fieldMode: 'hidden' }
            }
        }),
        goals: relationship({
            ref: 'DirectionGoal',
            many: true,
            label: 'Блок: Для каких целей подойдет этот курс',
            ui: {
                displayMode: 'cards',
                cardFields: ['statusView', 'image', 'name'],
                inlineEdit: { fields: ['statusView', 'image', 'name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['statusView', 'image', 'name'] },
                createView: { fieldMode: 'hidden' }
            }
        }),
        results: relationship({
            ref: 'DirectionResult',
            many: true,
            label: 'Блок: Чему вы научитесь',
            ui: {
                displayMode: 'cards',
                cardFields: ['statusView', 'name'],
                inlineEdit: { fields: ['statusView', 'name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['statusView', 'name'] },
                createView: { fieldMode: 'hidden' }
            }
        }),
        products: relationship({
            ref: 'Product',
            many: true,
            label: 'Курсы',
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
