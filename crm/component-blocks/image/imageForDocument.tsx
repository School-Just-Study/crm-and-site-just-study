import { FormField } from '@keystone-6/fields-document/component-blocks';
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { TImageValue } from './types';

type TImageOptions = {
    listKey: string
}

export const imageForDocument = ({ listKey }: TImageOptions): FormField<TImageValue, TImageOptions> => {
    return {
        kind: 'form',
        Input({ value, onChange }) {
            return <ImageUploader listKey={listKey} defaultValue={value} mode="edit" onChange={onChange} />
        },
        options: { listKey },
        defaultValue: null,
        validate(value) {
            return typeof value === 'object'
        },
    }
}
