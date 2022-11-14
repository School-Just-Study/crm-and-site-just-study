import { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import { MainLayout } from '@src/layouts/MainLayout';
import { SEO } from '@shared/components/SEO/SEO';
import { Box, Card, Container, Typography } from '@mui/material';
import * as React from 'react';
import { RecordForLesson } from '@shared/components/RecordForLesson';
import dynamic from 'next/dynamic';
import { Authorization } from '@shared/components/Authorization';

const RecordLessonPage: NextPage = () => {
    const theme = useTheme();

    return (
        <MainLayout>
            <SEO title="Запись на урок" noIndex />
            <Box
                bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100}
                px={{ xs: 0.5, md: 6 }}
                py={{ xs: 2, md: 6 }}>
                <Container maxWidth="sm" sx={{ p: 0 }}>
                    <Authorization>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                py: { xs: 3, md: 6 },
                                px: { xs: 2, md: 6 }
                            }}>
                            <Typography variant="h2" mb={3}>
                                ✍🏻 Запись на урок
                            </Typography>

                            <RecordForLesson />
                        </Card>
                    </Authorization>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default dynamic(() => Promise.resolve(RecordLessonPage), {
    ssr: false
});
