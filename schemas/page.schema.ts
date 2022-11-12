import { list } from '@keystone-6/core';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { relationship, text } from '@keystone-6/core/fields';
import { statusView } from '../fields/statusView';
import { handleSlugForPage } from '../lib/handleSlugForPage';
import { content } from '../fields/document';

export const Page = list({
    ui: {
        label: 'Страницы',
        labelField: 'title',
        listView: {
            initialColumns: ['title', 'language', 'statusView', 'tag', 'author'],
            pageSize: 20
        },
        searchFields: ['title', 'description', 'slug']
    },
    fields: {
        language,
        statusView,
        title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
        slug: text({
            isIndexed: true,
            isFilterable: true,
            label: 'Путь к странице'
        }),
        description: text({
            ui: {
                displayMode: 'textarea'
            },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Выделенный текст сверху страницы'
        }),
        content,
        tag: relationship({
            ref: 'Tag',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name'] }
            },
            label: 'Теги'
        }),
        author: relationship({ ref: 'User', label: 'Автор' }),
        createdAt,
        lastModification
    },
    hooks: {
        resolveInput: handleSlugForPage
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
