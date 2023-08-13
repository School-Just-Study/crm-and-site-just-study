import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SEO } from '@src/shared/components/SEO/SEO';
import * as React from 'react';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { ILanguages } from '@src/shared/modules/constants';
import { NextPageWithLayout } from '@shared/types/page';
import { MainLayout } from '@src/layouts/MainLayout';
import { successPage } from '@translations/successPage';

const SuccessPage: NextPageWithLayout = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(successPage, locale as ILanguages);

    return (
        <>
            <SEO title={t.title} description={t.description} noIndex />
            <Box bgcolor={theme.palette.primary.main} py={{ xs: 2, md: 6 }}>
                <Stack gap={2} mb={3} px={{ xs: 1, md: 6 }} sx={{ p: 0, textAlign: 'center' }}>
                    <Typography color="white" variant="h2" mb={{ xs: 1 }} style={{ wordBreak: 'break-word' }}>
                        {t.formLead.title}
                    </Typography>
                    <Typography color="white" variant="h5">
                        {t.formLead.desc}
                    </Typography>
                </Stack>
                {/*<FirstLesson />*/}
            </Box>
        </>
    );
};

SuccessPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default SuccessPage;
