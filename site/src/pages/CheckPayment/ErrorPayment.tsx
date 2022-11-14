import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import imageError from './errorPayment.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { resultPage } from '@translations/resultPage';

export const ErrorPayment: FC<{ url: string }> = ({ url }) => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(resultPage, locale);

    return (
        <Box bgcolor={theme.palette.error.main} px={{ xs: 0.5, md: 6 }} py={{ xs: 2, md: 6 }}>
            <Container maxWidth="md" sx={{ p: 0 }}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        py: { xs: 3, md: 6 },
                        px: { xs: 2, md: 6 },
                        alignItems: 'center'
                    }}>
                    <Stack gap={2}>
                        <Typography variant="h1">{t.error.title} 😢</Typography>
                        <Typography variant="h5">{t.error.description}</Typography>
                        <Box m="auto" width="100%" height={400} position="relative">
                            <Image
                                src={imageError}
                                alt={t.error.title}
                                priority
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                        <Button variant="contained" sx={{ width: 200, alignSelf: 'center' }} href={url}>
                            Повторить
                        </Button>
                    </Stack>
                </Card>
            </Container>
        </Box>
    );
};
