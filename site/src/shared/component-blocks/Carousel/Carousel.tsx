import React from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './styles';
import { Typography } from '@mui/material';

type CarouselProps = {
    items: {
        title: string;
        imageSrc: string;
    }[];
};

export function Carousel({ items = [] }: CarouselProps) {
    return (
        <div className={styles.carousel}>
            {items.map((item) => {
                return (
                    <CarouselItem key={item.imageSrc}>
                        <img src={item.imageSrc} className={styles.carouselImage} />
                        <Typography variant="h6" mt={1} fontWeight="bold">
                            {item.title}
                        </Typography>
                    </CarouselItem>
                );
            })}
        </div>
    );
}
