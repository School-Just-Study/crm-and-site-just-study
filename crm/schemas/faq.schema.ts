import { list } from '@keystone-6/core';
import { language } from '../fields/language';
import { statusView } from '../fields/statusView';
import { relationship, text } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const Faq = list({
    ui: {
        label: '❓FAQ',
        listView: {
            initialColumns: ['id', 'title', 'desc', 'statusView', 'language']
        }
    },
    fields: {
        language,
        statusView,
        products: relationship({ ref: 'Product', many: true, label: 'Курсы' }),
        title: text({ validation: { isRequired: true }, label: 'Вопрос' }),
        desc: text({
            validation: { isRequired: true },
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(1000)' },
            label: 'Ответ'
        }),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            create: ({ session }) => !!session,
            update: ({ session }) => !!session,
            delete: ({ session }) => !!session,
            query: () => true
        }
    }
});
