import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import { ImageUploader } from './ImageUploader';
import { imageForDocument } from './imageForDocument';
import React from 'react';

export const image = component({
    preview: ({ fields }) => (
        <NotEditable>
            <ImageUploader
                listKey={fields.image.options.listKey}
                defaultValue={fields.imageRel.value?.data}
                imageAlt={fields.imageAlt.value}
                onChange={fields.image.onChange}
                onImageAltChange={fields.imageAlt.onChange}
                onRelationChange={fields.imageRel.onChange}
            />
        </NotEditable>
    ),
    label: 'Image',
    schema: {
        imageAlt: fields.text({
            label: 'Image Alt',
            defaultValue: '',
        }),
        imageRel: fields.relationship({
            listKey: 'Image',
            label: 'Image Relation',
            selection: 'id, image { width, height, url }',
        }),
        image: imageForDocument({
            listKey: 'Image',
        }),
    },
    chromeless: true,
});
