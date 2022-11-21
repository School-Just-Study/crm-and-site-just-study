import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { imageStorageField } from '../fields/imageField';
import { IImageFieldInput } from '../component-blocks/image/types';

export const Image = list({
    ui: {
        isHidden: true,
        listView: {
            initialColumns: ['name', 'type', 'image'],
            initialSort: { field: 'name', direction: 'ASC' }
        }
    },
    fields: {
        name: text(),
        // Category, Page, Post, Document (from document editor)
        type: text({ defaultValue: 'Document' }),
        filename: text({
            isIndexed: 'unique',
            db: { isNullable: true },
            ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } }
        }),
        image: imageStorageField
    },
    hooks: {
        resolveInput: async ({ resolvedData, item }) => {
            const { name, image } = resolvedData;
            const imageId = (image as IImageFieldInput).id ?? item?.image_id;
            const imageExt = (image as IImageFieldInput).extension ?? item?.image_extension;
            // @ts-ignore
            const origFilename = imageId ? imageId.split('-').slice(0, -1).join('-') : 'unknown';
            const filename = imageId ? `${imageId}.${imageExt}` : null;

            if (name === '') {
                return { ...resolvedData, name: origFilename || item?.name, filename: filename || item?.filename };
            }

            return { ...resolvedData, filename };
        }
    },
    access: {
        operation: {
            query: () => true,
            create: ({ session }) => !!session,
            update: ({ session }) => !!session,
            delete: ({ session }) => !!session
        }
    }
});
