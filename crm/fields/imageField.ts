import { image, relationship } from '@keystone-6/core/fields';

export const imageField = relationship({
    ref: 'Image',
    hooks: {
        beforeOperation: async ({ resolvedData, listKey, context }) => {
            const imageId = resolvedData?.image?.connect?.id

            if (imageId) {
                context.query.Image.updateOne({
                    where: { id: imageId },
                    data: {
                        type: listKey,
                    },
                })
            }
        },
    },
    label: "Изображение",
    ui: {
        displayMode: 'cards',
        cardFields: ['image'],
        inlineEdit: { fields: ['image'] },
        linkToItem: true,
        inlineConnect: false,
        inlineCreate: { fields: ['image'] },

    },
})

export const imageStorageField = image({ storage: "storage_blog_image", label: "Изображение", })
