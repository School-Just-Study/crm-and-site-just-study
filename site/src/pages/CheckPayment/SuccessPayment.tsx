import { Box, Card, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import successImage from './successPayment.png';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { resultPage } from '@translations/resultPage';

export const SuccessPayment: FC = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(resultPage, locale);

    return (
        <Box bgcolor={theme.palette.success.main} px={{ xs: 0.5, md: 6 }} py={{ xs: 2, md: 6 }}>
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
                        <Typography variant="h1">{t.success.title}</Typography>
                        <Typography variant="h5">{t.success.description} ❤️</Typography>
                        <Box m="auto" width="100%" height={400} position="relative">
                            <Image
                                src={successImage}
                                alt={t.success.title}
                                priority
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </Stack>
                </Card>
            </Container>
        </Box>
    );
};
