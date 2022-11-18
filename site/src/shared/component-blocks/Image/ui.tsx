import React, { FC } from 'react';

interface ImageProps {
    imageAlt: string;
    imageRel: {
        data: {
            id: string;
            image: {
                width: 502;
                height: 244;
                url: 'https://sitejuststudy.storage.yandexcloud.net/blog-cover-886eea5b-24a5-4bb5-ab29-8f241dcc82ca.png';
            };
        };
        id: string;
        label: string;
    };
}

export const Image: FC<ImageProps> = ({ imageRel, imageAlt }) => {
    return <img src={imageRel.data.image.url} alt={imageAlt || 'image'} width="100%" height="100%" />;
};
