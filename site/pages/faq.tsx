import { Box, Container } from '@mui/material';
import { FAQ } from '@shared/components/FAQ/FAQ';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { SEO } from '@src/shared/components/SEO/SEO';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { faq } from '@translations/faq';
import { ILanguages } from '@src/shared/modules/constants';
import { NextPageWithLayout } from '@shared/types/page';
import { MainLayout } from '@src/layouts/MainLayout';

const FaqPage: NextPageWithLayout = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(faq, locale as ILanguages);

    return (
        <>
            <SEO title={t.title} description={t.description} />
            <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['800'] : theme.palette.grey['100']}>
                <Container maxWidth="xl">
                    <FAQ />
                </Container>
            </Box>
        </>
    );
};

FaqPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default FaqPage;
