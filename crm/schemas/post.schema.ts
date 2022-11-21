import { list } from '@keystone-6/core';
import { language } from '../fields/language';
import { statusView } from '../fields/statusView';
import { relationship, text } from '@keystone-6/core/fields';
import { content } from '../fields/document';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { imageField } from '../fields/imageField';

export const Post = list({
    ui: {
        label: 'Блог',
        labelField: 'title',
        listView: {
            initialColumns: ['title', 'language', 'statusView', 'tag', 'author'],
            pageSize: 20
        }
    },
    fields: {
        language,
        statusView,
        cover: imageField,
        title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
        description: text({
            validation: { isRequired: true },
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
            label: 'Теги'
        }),
        author: relationship({ ref: 'User', label: 'Автор' }),
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
