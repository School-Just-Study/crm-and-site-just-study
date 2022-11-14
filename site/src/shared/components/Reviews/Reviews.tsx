import * as React from 'react';
import { FC, useRef } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { reviews } from '@translations/reviews';
import { ProductReview } from '@src/shared/lib/apollo/types';
import { settings } from './settings';
import 'slick-carousel/slick/slick.css';
import { ReviewItem } from '@shared/components/Reviews/ReviewItem';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '@shared/components/Reviews/query';

export const Reviews: FC<{ productId?: string[] }> = ({ productId }) => {
    const slider = useRef<Slider | null>(null);
    const { locale } = useRouter();
    const t = transition(reviews, locale);
    const { data } = useQuery<{ productReviews: ProductReview[] }>(QUERY_REVIEWS, { variables: { lang: locale } });

    const handleNext = () => {
        slider.current?.slickNext();
    };

    const handleBack = () => {
        slider.current?.slickPrev();
    };

    if (!data) return null;
    if (!data.productReviews.length) return null;

    const reviewsFilter = (review: ProductReview) => {
        if (productId) {
            const reviewIds = review.products?.map((review) => review.id);
            return reviewIds?.some((review) => productId.includes(review));
        } else {
            return true;
        }
    };

    return (
        <Container maxWidth="xl">
            <Box py={4} px={{ xs: 0, md: 4 }}>
                <Typography my={3} variant="h2">
                    {t.title}
                </Typography>
                <Slider ref={slider} {...settings}>
                    {data?.productReviews.filter(reviewsFilter).map((review) => (
                        <ReviewItem review={review} key={review.id} />
                    ))}
                </Slider>
                <Stack gap={1} flexDirection="row" m={2} justifyContent="center" display={{ xs: 'none', sm: 'flex' }}>
                    <Button size="small" onClick={handleBack}>
                        <KeyboardArrowLeft />
                    </Button>
                    <Button size="small" onClick={handleNext}>
                        <KeyboardArrowRight />
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};
