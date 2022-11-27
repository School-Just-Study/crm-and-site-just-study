import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Card, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import client from '@src/shared/lib/apollo/apolloClient';
import { SEO } from '@shared/components/SEO/SEO';
import * as React from 'react';
import { NextPageWithLayout } from '@shared/types/page';
import { Page } from '@src/shared/lib/apollo/types';
import { MainLayout } from '@src/layouts/MainLayout';
import { QUERY_PAGE, QUERY_PAGE_PATHS } from '@src/shared/lib/apollo/Pages';
import { CustomRenderer } from '@shared/component-blocks/CustomRenderer/CustomRenderer';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { useRouter } from 'next/router';
import { DISABLED_BUILD_STATIC_PATHS } from '../../config';

const CMSPage: NextPageWithLayout<{ data: Page }> = ({ data }) => {
    const { isFallback } = useRouter();
    const { title, content, description, language } = data;
    const theme = useTheme();

    if (isFallback) {
        return <SpinnerWrapper loading centerMode />;
    }

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

export const getStaticPaths: GetStaticPaths = async () => {
    if (DISABLED_BUILD_STATIC_PATHS) {
        return {
            paths: [],
            fallback: true
        };
    } else {
        const { data } = await client.query<{ pages: Page[] }>({
            query: QUERY_PAGE_PATHS
        });

        const paths = data?.pages?.map((page) => ({
            params: { slug: page.slug },
            locale: page?.language as string
        }));

        return {
            paths,
            fallback: true
        };
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
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
        },
        revalidate: 10
    };
};

export default CMSPage;
