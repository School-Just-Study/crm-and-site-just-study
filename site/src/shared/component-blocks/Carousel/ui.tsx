import React from 'react';
import styles from './Carousel.module.css';
import { CarouselItemProps } from '@shared/component-blocks/Carousel/Item/types';
import { Item } from '@shared/component-blocks/Carousel/Item';

export type CarouselProps = {
    items: CarouselItemProps[];
};

export function Carousel({ items = [] }: CarouselProps) {
    return (
        <div className={styles.carousel}>
            {items.map((item) => {
                return <Item key={item.image.id} item={item} />;
            })}
        </div>
    );
}
