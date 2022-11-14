import { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { AccountWrapper } from '@src/layouts/AccountWrapper';
import { AddReview } from '@src/pages/Profile/StudentCabinet';
import { useRouter } from 'next/router';

const AddReviewPage: NextPage = () => {
    const theme = useTheme();
    const { query, locale } = useRouter();

    const productId = query?.product as string;

    return (
        <AccountWrapper title="Добавить отзыв">
            <Container maxWidth="md">
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        py: { xs: 3, md: 6 },
                        px: { xs: 2, md: 6 }
                    }}>
                    <Typography variant="h2" mb={3}>
                        🤗 Добавить отзыв
                    </Typography>

                    <AddReview productId={productId} language={locale} />
                </Card>
            </Container>
        </AccountWrapper>
    );
};

export default dynamic(() => Promise.resolve(AddReviewPage), {
    ssr: false
});
