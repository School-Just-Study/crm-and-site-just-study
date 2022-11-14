import { GetServerSideProps } from 'next';
import { Box, Card, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import client from '@src/shared/lib/apollo/apolloClient';
import { SEO } from '@shared/components/SEO/SEO';
import * as React from 'react';
import { NextPageWithLayout } from '@shared/types/page';
import { Page } from '@src/shared/lib/apollo/types';
import { MainLayout } from '@src/layouts/MainLayout';
import { QUERY_PAGE } from '@src/shared/lib/apollo/Pages';
import { CustomRenderer } from '@shared/component-blocks/CustomRenderer/CustomRenderer';

const CMSPage: NextPageWithLayout<{ data: Page }> = ({ data }) => {
    const { title, content, description, language } = data;
    const theme = useTheme();

    return (
        <>
            <SEO
                title={title as string}
                description={description as string}
                language={language as string}
                disableAlternateLocale
            />
            <Box bgcolor={theme.palette.primary.main} px={{ xs: 0.5, md: 6 }} py={{ xs: 2, md: 6 }}>
                <Container maxWidth="xl" sx={{ p: 0 }}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
                        <Typography variant="h1" mb={{ xs: 1, md: 3 }} style={{ wordBreak: 'break-word' }}>
                            {title}
                        </Typography>
                        {description && (
                            <Typography variant="h5" color={theme.palette.primary.main} fontWeight="bold">
                                {description}
                            </Typography>
                        )}
                        {content && <CustomRenderer document={content.document} />}
                    </Card>
                </Container>
            </Box>
        </>
    );
};

CMSPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params?.slug;
    const lang = ctx.locale;
    const { data } = await client.query<{ pages: Page[] }>({
        query: QUERY_PAGE,
        variables: { slug, lang }
    });

    const notFound = data.pages.length === 0;

    if (notFound) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: data.pages[0]
        }
    };
};

export default CMSPage;
