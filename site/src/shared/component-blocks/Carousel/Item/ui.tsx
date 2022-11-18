import styles from '@shared/component-blocks/Carousel/Carousel.module.css';
import { Typography } from '@mui/material';
import { CarouselItem } from './styles';
import React, { FC } from 'react';
import { CarouselItemProps } from '@shared/component-blocks/Carousel/Item/types';
import { useQuery } from '@apollo/client';
import { FIND_IMAGE } from '@shared/component-blocks/Carousel/Item/query';
import { Query } from '@shared/lib/apollo/types';

export const Item: FC<{ item: CarouselItemProps }> = ({ item }) => {
    const { data } = useQuery<Query>(FIND_IMAGE, { variables: { id: item.image.id } });

    return (
        <CarouselItem>
            <img src={data?.image?.image?.url} className={styles.carouselImage} />
            <Typography variant="h6" mt={1} fontWeight="bold">
                {item.title}
            </Typography>
        </CarouselItem>
    );
};
