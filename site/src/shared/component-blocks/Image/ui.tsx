import React, { FC } from 'react';

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
        <img
            src={imageRel.data.image.url}
            alt={imageAlt || 'image'}
            width="100%"
            height="100%"
            style={{
                borderRadius: 20
            }}
        />
    );
};
