import React, { FC } from 'react';
import { default as NextImage } from 'next/image';

interface ImageProps {
    imageAlt: string;
    imageRel: {
        data: {
            id: string;
            image: {
                width: number;
                height: number;
                url: string;
            };
        };
        id: string;
        label: string;
    };
}

export const Image: FC<ImageProps> = ({ imageRel, imageAlt }) => {
    return (
        <NextImage
            src={imageRel?.data?.image?.url as string}
            alt={imageAlt || 'image'}
            width={500}
            height={500}
            style={{
                borderRadius: 20,
                width: '100%',
                height: 'auto'
            }}
        />
    );
};
